<?php

namespace App\Services;

use App\Http\Requests\Product\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Reserved;
use App\Models\Tax;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Collection;

class ProductService 
{
    public function __construct(
        private TaxService $taxService,
        private CategoryService $categoryService,
        private CustomerService $customerService,
        private DebtService $debtService,
        private BatchService $batchService,
    ) {}

    public function getProductByID(int $productID): Product
    {
        return Product::findOrFail($productID);
    }

    public function getAllProducts(): Collection
    {
        $products = $this->getAllProductsGroupedByStatus();
        $this->populateAvailableProductsInfo($products);
        $this->populateReservedProductsInfo($products);
        $this->populatePendingProductsInfo($products);
        $this->populateSoldProductsInfo($products);
        return $products;
    }

    private function getAllProductsGroupedByStatus(): Collection
    {
        return Product::orderBy('name', 'asc')->get()->groupBy('status');
    }

    private function populateAvailableProductsInfo(Collection &$products): void
    {
        if (!empty($products['available'])) {
            $products['available']->each(function ($product) {
                $product->selling_price = $this->calculateFinalSellingPrice($product);
                $product->batch = $this->batchService->findBatchByPurchaseDate($product->purchase_date);
            });
        }
    }

    private function calculateFinalSellingPrice(Product $product): float
    {
        $activatedTaxes = $this->taxService->getAllActivatedTaxes();
        if ($activatedTaxes) {
            $taxValue = 0;
            foreach ($activatedTaxes as $activatedTax) {
                if ($this->isTaxAppliedForAllProducts($activatedTax)) {
                    $taxValue += $this->getTaxForAllProducts($product, $activatedTax);
                } else {
                    $taxValue += $this->getTaxForSpecificCategories($product, $activatedTax);
                }
            }
            return $product->price + $taxValue;
        }
        return $product->price;
    }

    private function isTaxAppliedForAllProducts(Tax $tax): bool
    {
        $categoryName = $this->categoryService->getCategoryName($tax->category_id);
        return $categoryName === Category::ALL_CATEGORIES_STRING_VALUE;
    }

    private function getTaxForAllProducts(Product $product, Tax $tax): float
    {
        if ($this->doesTaxHaveATimePeriod($tax)) {
            if ($this->isProductPurchaseDateBetweenTaxTimePeriod($product->purchase_date, $tax->start_date, $tax->end_date)) {
                return $this->getTax($product, $tax);
            }
            return 0;
        } else { 
            return $this->getTax($product, $tax);
        }
    }

    private function doesTaxHaveATimePeriod(Tax $tax): bool
    {
        return $tax->start_date && $tax->end_date;
    }

    private function isProductPurchaseDateBetweenTaxTimePeriod(string $purchaseDate, string $taxStartDate, string $taxEndDate): bool
    {
        return $purchaseDate >= $taxStartDate && $purchaseDate <= $taxEndDate;
    }

    private function getTax(Product $product, Tax $tax): float
    {
        if ($tax->percentage) {
            return $product->price * ($tax->percentage / 100);
        }
        if ($tax->spread_tax) { // trocar pra split
            return $this->getTaxSplit($tax);
        }
        return $tax->price;
    }

    private function getTaxForSpecificCategories(Product $product, Tax $tax): float
    {
        if ($this->hasProductAndTaxSameCategory($product, $tax)) {
            return $this->getTax($product, $tax);
        }
        return 0;
    }

    private function hasProductAndTaxSameCategory(Product $product, Tax $tax): bool
    {
        return $product->category_id === $tax->category_id;
    }

    private function getTaxSplit(Tax $tax): float
    {
        $splitNumber = $this->getSplitNumber($tax);
        $splitAmount = $tax->price / $splitNumber;
        return $splitAmount;
    }

    private function getSplitNumber(Tax $tax): int
    {
        $products = $this->doesTaxHaveATimePeriod($tax) ? $this->getProductsByPurchaseDateRange($tax) : $this->getAvailableProducts();
        $splitNumber = 0;
        foreach ($products as $product) {
            $splitNumber += $product->quantity * 1;
        }
        return $splitNumber;
    }

    private function getAvailableProducts(): Collection
    {
        return Product::where('status', 'available')->get();
    }

    private function getProductsByPurchaseDateRange(Tax $tax): Collection
    {
        return Product::where('status', 'available')->whereBetween('purchase_date', [$tax->start_date, $tax->end_date])->get();
    }

    private function populateSoldProductsInfo(Collection &$products): void
    {
        if (!empty($products['sold'])) {
            $products['sold']->each(function ($product) {
                $transactions = $this->getTransactionsByProductID($product->id);
                foreach ($transactions as $transaction) {
                    $product->customer = $this->customerService->getCustomerNameByID($transaction['customer_id']);
                    $product->sold_price = $transaction['price'];
                    $product->payment_method = $transaction['payment_method'];
                    $product->discount = $transaction['discount'];
                    $product->sold_date = $transaction['date'];
                    $product->debts = $this->debtService->getProductDebtsByID($product->id, $transaction['customer_id']);
                }
            });
        }
    }

    private function getTransactionsByProductID(string $productID): array   // ISSO AQUI TEM IR PRA UM REPOSITORY OU AJUSTAR CONFLITO DE SERVICE
    {
        return Transaction::where('product_id', $productID)->get()->toArray();
    }

    private function populatePendingProductsInfo(Collection &$products): void
    {
        if (!empty($products['pending'])) {
            $products['pending']->each(function ($product) {
                $transactions = $this->getTransactionsByProductID($product->id);
                foreach ($transactions as $transaction) {
                    $product->customer_id = $transaction['customer_id'];
                    $product->customer = $this->customerService->getCustomerNameByID($transaction['customer_id']);
                    $product->sold_price = $transaction['price'];
                    $product->payment_method = $transaction['payment_method'];
                    $product->installments = $transaction['installments'];
                    $product->discount = $transaction['discount'];
                    $product->sold_date = $transaction['date'];

                    $debt = $this->debtService->getLastInstallmentFromProduct($product->id);
                    $product->current_installment = $debt !== null ? $debt->current_installment : '';
                    $product->date_to_end = $debt !== null ? $this->debtService->getDateToEndInstallments($debt->installments, $debt->current_installment) : '';
                    $product->paid_value = $this->debtService->getPendingProductPaidValue($product->id);
                    $product->remaining_value = $this->getRemainingValueFromPendingProduct($transaction['price'], $product->paid_value);
                    $product->debts = $this->debtService->getProductDebtsByID($product->id, $transaction['customer_id']);
                }
            });
        }
    }

    private function populateReservedProductsInfo(Collection &$products): void
    {
        if (!empty($products['reserved'])) {
            $products['reserved']->each(function ($product) {
                $reservedData = Reserved::where('product_id', $product->id)->first(); // ajuste de service ou repostory
                $product->customer = $this->customerService->getCustomerNameByID($reservedData->customer_id);
                $product->reserved_value = $reservedData->reserved_value;
                $product->reserved_date = date('d/m/Y', strtotime($reservedData->reserved_date));
            });
        }
    }

    private function getRemainingValueFromPendingProduct(float $totalPrice, float $paidPrice): float | string
    {
        $remainingValue = $totalPrice - $paidPrice;
        return number_format($remainingValue, 2);
    }

    public function handleProductStatusAfterUpdateInstallment(array $data): void
    {
        if ($this->hasInstallmentEnded($data['current_installment'], $data['installments'])) {
            $product = $this->getProductByID($data['product_id']);
            $product->status = 'sold';
            $product->save();
        }
    }

    private function hasInstallmentEnded($currentInstallmet, $installments): bool
    {
        return $currentInstallmet === $installments;
    }

    public function handleCreateData(StoreProductRequest $request): array
    {
        $data = $request->validated();
        $data['status'] = 'available';
        
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/products');
            $data['image'] = str_replace('images/' , '', $imagePath);
        } else {
            $data['image'] = 'placeholder.jpg';
        }
        
        return $data;
    }
}

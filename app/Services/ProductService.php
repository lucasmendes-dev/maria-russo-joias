<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Collection;

class ProductService 
{
    public function __construct(
        private TaxService $taxService,
        private CategoryService $categoryService,
    ) {}

    public function getAllProducts(): Collection
    {
        $products = $this->getAllProductsGroupedByStatus();
        $this->addSellingPriceToAvailableProducts($products);
        return $products;
    }

    private function getAllProductsGroupedByStatus(): Collection
    {
        return Product::all()->groupBy('status');
    }

    private function addSellingPriceToAvailableProducts(Collection &$products): void
    {
        $products['available']->each(function ($product) {
            $product->selling_price = $this->calculateFinalSellingPrice($product);
        });
    }

    private function calculateFinalSellingPrice(Product $product): float
    {
        $activatedTaxes = $this->taxService->getAllActivatedTaxes();
        if ($activatedTaxes) {
            $taxValue = 0;
            foreach ($activatedTaxes as $activatedTax) {
                if ($this->isTaxAppliedForAllProducts($activatedTax)) {
                    $taxValue += $this->applyTaxForAllProducts($product, $activatedTax);
                } else {
                    return $this->applyTaxForSpecificCategories($product, $activatedTax);
                }
            }
            return $product->price + $taxValue;
        }
        return $product->price;
    }

    private function isTaxAppliedForAllProducts(Tax $tax): bool
    {
        $categoryName = $this->categoryService->getCategoryName($tax->category_id);
        return $categoryName === 'Todos';
    }

    private function applyTaxForAllProducts(Product $product, Tax $tax): float
    {
        if ($this->doesTaxHaveATimePeriod($tax)) {
            if ($this->isProductPurchaseDateBetweenTaxTimePeriod($product->purchase_date, $tax->start_date, $tax->end_date)) {
                return $this->applyTax($product, $tax);
            }
            return 0;
        } else { 
            return $this->applyTax($product, $tax);
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

    private function applyTax(Product $product, Tax $tax): float
    {
        if ($tax->percentage) {
            return $product->price * ($tax->percentage / 100);
        }
        if ($tax->spread_tax) { // trocar pra split
            return $this->applyTaxSplit($product, $tax);
        }
        return $tax->price; // INCOMPLETO AINDA
    }

    private function applyTaxForSpecificCategories(Product $product, Tax $tax): float
    {
        if ($this->hasProductAndTaxSameCategory($product, $tax)) {
            return $this->applyTax($product, $tax);
        }
        return $tax->price;
    }

    private function hasProductAndTaxSameCategory(Product $product, Tax $tax): bool
    {
        return $product->category_id === $tax->category_id;
    }

    private function applyTaxSplit(Product $product, Tax $tax): float
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
}

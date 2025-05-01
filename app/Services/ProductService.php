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
            foreach ($activatedTaxes as $activatedTax) {
                if ($this->isTaxAppliedForAllProducts($activatedTax)) {
                    return $this->applyTaxForAllProducts($product, $activatedTax);
                } else {
                    return $this->applyTaxForSpecificCategories($product, $activatedTax);
                }
            }
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
            return $product->price;
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
            return $product->price + ($product->price * ($tax->percentage / 100));
        }
        if ($tax->spread_tax) { // trocar pra split
            return $this->applyTaxSplit($product, $tax);
        }
        return $product->price + $tax->price; // INCOMPLETO AINDA
    }

    private function applyTaxForSpecificCategories(Product $product, Tax $tax): float
    {
        if ($this->hasProductAndTaxSameCategory($product, $tax)) {
            return $this->applyTax($product, $tax);
        }
        return $product->price;
    }

    private function hasProductAndTaxSameCategory(Product $product, Tax $tax): bool
    {
        return $product->category_id === $tax->category_id;
    }

    private function applyTaxSplit(Product $product, Tax $tax): float
    {
        return 0.0; // continuar daqui
    }
}

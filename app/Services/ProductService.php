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
            $product->selling_price = $this->calculateFinalSellingPrice($product); // CHECAR SE PASSA POR REFERÊNCIA
        });
    }

    private function calculateFinalSellingPrice(Product $product): float
    {
        $activatedTaxes = $this->taxService->getAllActivatedTaxes();
        if ($activatedTaxes) { // PROBLEMA DOS LOOPS
            foreach ($activatedTaxes as $activatedTax) {
                if ($this->isTaxAppliedForAllProducts($activatedTax)) {
                    return $this->applyTaxForAllProducts($product, $activatedTax); // TALVEZ RETORNAR VOID E ALTERAR POR REFERÊNCIA
                } else {
                    if ($this->hasProductAndTaxSameCategory($product, $activatedTax)) {
                        return $this->applyTaxForAllProducts($product, $activatedTax);
                    }
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

    private function hasProductAndTaxSameCategory(Product $product, Tax $tax): bool
    {
        return $product->category_id === $tax->category_id;
    }

    private function applyTaxForAllProducts(Product $product, Tax $tax): float
    {
        if ($tax->percentage) {
            return $product->price + ($product->price * ($tax->percentage / 100));
        }
        if ($tax->price) {
            return $product->price + $tax->price; // INCOMPLETO AINDA
        }
        return $product->price;
    }

    private function applyTaxForCategoryProducts(Product $product, Tax $tax): float
    {

    }

}

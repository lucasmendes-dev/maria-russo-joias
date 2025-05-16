<?php

namespace App\Services;

class ReservedService 
{
    public function __construct(private ProductService $productService) {}

    public function setProductAsReserved(int $productId)
    {
        $product = $this->productService->getProductByID($productId);
        $product->status = 'reserved';

        $product->save();
    }

    public function getReservedDataByProductID(string $productID)
    {
        
    }
}

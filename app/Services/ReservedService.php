<?php

namespace App\Services;

use App\Models\Product;

class ReservedService 
{
    public function __construct(private ProductService $productService) {}

    public function setProductAsReserved(int $productId)
    {
        $product = Product::findOrFail($productId);
        $product->status = 'reserved';

        $product->save();
    }
}

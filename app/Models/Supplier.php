<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\ProductToOrder;

class Supplier extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'social_media',
        'local',
        'saller_name',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function productsToOrder()
    {
        return $this->hasMany(ProductToOrder::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductToOrder;
use App\Models\Tax;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function productsToOrder()
    {
        return $this->hasMany(ProductToOrder::class);
    }

    public function taxes()
    {
        return $this->hasMany(Tax::class);
    }
}

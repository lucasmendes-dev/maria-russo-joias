<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Supplier;

class ProductToOrder extends Model
{
    protected $fillable = [
        'name',
        'quantity',
        'price',
        'category_id',
        'description',
        'color',
        'supplier_id',
        'image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function suppliers()
    {
        return $this->belongsTo(Supplier::class);
    }
}

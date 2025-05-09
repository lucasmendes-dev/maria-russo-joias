<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Detail;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\Transaction;

class Product extends Model
{
    protected $fillable = [
        'name',
        'quantity',
        'price',
        'category_id',
        'description',
        'color',
        'purchase_date',
        'supplier_id',
        'image',
        'status',
    ];

    public function details()
    {
        return $this->belongsToMany(Detail::class);
    }

    public function customers()
    {
        return $this->belongsToMany(Customer::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}

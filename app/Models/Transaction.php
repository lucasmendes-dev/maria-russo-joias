<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Customer;

class Transaction extends Model
{
    protected $fillable = [
        'type',
        'customer_id',
        'product_id',
        'quantity',
        'price',
        'payment_method',
        'discount',
        'installments',
        'machine_fee',
        'date',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}

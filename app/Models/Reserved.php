<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserved extends Model
{
    protected $fillable = [
        'product_id',
        'customer_id',
        'reserved_date',
        'reserved_value',
        'description',
    ];
}

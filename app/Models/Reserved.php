<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reserved extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'customer_id',
        'reserved_date',
        'reserved_value',
        'description',
    ];

    public static function getReservedProductsSumValue(): float
    {
        return self::sum('reserved_value');
    }
}

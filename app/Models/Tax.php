<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Tax extends Model
{
    public const MACHINE_FEE_VALUES = [
        // 1 => 4.9,
        2 => 6.4,
        3 => 7.9,
        4 => 9.4,
        5 => 10.9,
        6 => 12.4,
        7 => 13.9,
        8 => 15.4,
        9 => 16.9,
        10 => 18.4,
    ];

    protected $fillable = [
        'name',
        'percentage',
        'price',
        'category_id',
        'description',
        'start_date',
        'end_date',
        'spread_tax',
        'tax_activated'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

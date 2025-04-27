<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Tax extends Model
{
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

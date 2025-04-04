<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Detail extends Model
{
    protected $fillable = [

    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}

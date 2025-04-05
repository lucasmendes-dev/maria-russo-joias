<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'local',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}

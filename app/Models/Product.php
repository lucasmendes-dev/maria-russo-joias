<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Detail;
use App\Models\Category;

class Product extends Model
{
    protected $fillable = [

    ];

    public function details()
    {
        return $this->belongsToMany(Detail::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

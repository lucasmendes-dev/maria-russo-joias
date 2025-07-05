<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tax;

class Category extends Model
{
    public const ALL_CATEGORIES_STRING_VALUE = 'Todos';

    protected $fillable = [
        'name',
        'description',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function taxes()
    {
        return $this->hasMany(Tax::class);
    }
}

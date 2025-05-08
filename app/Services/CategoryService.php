<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService 
{
    public function __construct() {}

    public function getIdAndNameFromAllCategories(): Collection
    {
        return Category::all(['id', 'name']);
    }

    public function getCategoryName(string $categoryId): string
    {
        return Category::where('id', $categoryId)->value('name');
    }
}

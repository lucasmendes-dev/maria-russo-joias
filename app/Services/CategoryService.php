<?php

namespace App\Services;

use App\Models\Category;

class CategoryService 
{
    public function __construct() {}

    public function getIdAndNameFromAllCategories()
    {
        return Category::all(['id', 'name']);
    }

    public function getCategoryName(string $categoryId): string
    {
        return Category::where('id', $categoryId)->value('name');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('categories/index', ['categories' => $categories]);
    }

    public function store(StoreCategoryRequest $request)
    {
        //
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    public function destroy(Category $category)
    {
        //
    }
}

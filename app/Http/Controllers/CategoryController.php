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
        Category::create($request->validated());

        return redirect()->back()->with('success', 'Categoria "' . $request->name . '" cadastrada!');
    }

    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->validated());

        return redirect()->back()->with('success', 'Os dados da categoria "' . $category->name . '" foram atualizados!');
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $categoryName = $category->name;

        $category->delete();

        return redirect()->back()->with('success', 'Categoria "' . $categoryName . '" deletada com sucesso!');
    }
}

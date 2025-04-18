<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $availableProducts = Product::where('status', 'available')->get();
        $pendingProducts = Product::where('status', 'pending')->get();
        $soldProducts = Product::where('status', 'sold')->get();

        $categories = Category::all(['id', 'name']);
        $suppliers = Supplier::all(['id', 'name']);

        return Inertia::render('products/index', [
            'availableProducts' => $availableProducts,
            'pendingProducts' => $pendingProducts,
            'soldProducts' => $soldProducts,
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        Product::create($request->validated());

        return redirect()->back()->with('success', 'Produto "' . $request->name . '" cadastrado!');
    }

    public function update(UpdateProductRequest $request, string $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->validated());

        return redirect()->back()->with('success', 'Os dados do produto "' . $product->name . '" foram atualizados!');
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $productName = $product->name;

        $product->delete();

        return redirect()->back()->with('success', 'Produto "' . $productName . '" deletado com sucesso!');
    }
}

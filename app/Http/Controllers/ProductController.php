<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Supplier;
use App\Services\CategoryService;
use App\Services\ProductService;
use App\Services\SupplierService;
use App\Services\CustomerService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService,
        private CategoryService $categoryService,
        private SupplierService $supplierService,
        private CustomerService $customerService,
    ) {}

    public function index()
    {
        $products = $this->productService->getAllProducts();
        $categories = Category::getIdAndNameFromAllCategories();
        $suppliers = Supplier::getIdAndNameFromAllSuppliers();
        $customers = Customer::getAllCustomersSortedByName();

        return Inertia::render('products/index', [
            'availableProducts' => $products['available'] ?? [],
            'reservedProducts' => $products['reserved'] ?? [],
            'pendingProducts' => $products['pending'] ?? [],
            'soldProducts' => $products['sold'] ?? [],
            'categories' => $categories,
            'suppliers' => $suppliers,
            'customers' => $customers,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $data = $this->productService->handleCreateData($request);

        Product::create($data);

        return redirect()->back()->with('success', 'Produto "' . $request->name . '" cadastrado!');
    }

    public function update(UpdateProductRequest $request, string $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validated();
        unset($data['image']);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/products');
            $data['image'] = str_replace('images/' , '', $imagePath);
        }

        $product->update($data);

        return redirect()->back()->with('success', 'Os dados do produto "' . $product->name . '" foram atualizados!');
    }

    public function cancelReservation(string $id)
    {
        $product = Product::findOrFail($id);
        $product->status = 'available';
        $product->save();

        return redirect()->back()->with('success', 'A reserva do produto ' . $product->name . ' foi DESFEITA.');
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $productName = $product->name;

        $imagePath = 'images/' . $product->image;
        if ($product->image && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        $product->delete();

        return redirect()->back()->with('success', 'Produto "' . $productName . '" deletado com sucesso!');
    }
}

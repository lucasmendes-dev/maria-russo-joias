<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\CategoryService;
use App\Services\ProductService;
use App\Services\SupplierService;
use App\Services\CustomerService;
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
        $categories = $this->categoryService->getIdAndNameFromAllCategories();
        $suppliers = $this->supplierService->getIdAndNameFromAllSuppliers();
        $customers = $this->customerService->getAllCustomersSortedByName();

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
        $data = $request->validated();
        $data['status'] = 'available'; // implementar service para resolver isso aqui

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/products');
            $data['image'] = str_replace('images/' , '', $imagePath);
        }

        Product::create($data);

        return redirect()->back()->with('success', 'Produto "' . $request->name . '" cadastrado!');
    }

    public function update(UpdateProductRequest $request, string $id)
    {
        $product = $this->productService->getProductByID($id);

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
        $product = $this->productService->getProductByID($id);
        $product->status = 'available';
        $product->save();

        return redirect()->back()->with('success', 'A reserva do produto ' . $product->name . ' foi DESFEITA.');
    }

    public function destroy(string $id)
    {
        $product = $this->productService->getProductByID($id);
        $productName = $product->name;

        $product->delete();

        return redirect()->back()->with('success', 'Produto "' . $productName . '" deletado com sucesso!');
    }
}

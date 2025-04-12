<?php

namespace App\Http\Controllers;

use App\Http\Requests\Supplier\StoreSupplierRequest;
use App\Http\Requests\Supplier\UpdateSupplierRequest;
use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::all();
        return Inertia::render('suppliers/index', ['suppliers' => $suppliers]);
    }

    public function store(StoreSupplierRequest $request)
    {
        //
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        //
    }

    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplierName = $supplier->name;

        $supplier->delete();

        return redirect()->back()->with('success', 'Fornecedor "' . $supplierName . '" deletado(a) com sucesso!');
    }
}

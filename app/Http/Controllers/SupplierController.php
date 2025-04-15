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
        $data = $request->validated();
        $data['phone'] = cleanPhoneNumber($data['phone']);

        Supplier::create($data);

        return redirect()->back()->with('success', 'Fornecedor "' . $data['name'] . '" cadastrado!');
    }

    public function update(UpdateSupplierRequest $request, string $id)
    {
        $supplier = Supplier::findOrFail($id);
        $data = $request->validated();
        $data['phone'] = cleanPhoneNumber($data['phone']);

        $supplier->update($data);

        return redirect()->back()->with('success', 'Os dados do(a) cliente "' . $supplier->name . '" foram atualizados!');
    }

    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplierName = $supplier->name;

        $supplier->delete();

        return redirect()->back()->with('success', 'Fornecedor "' . $supplierName . '" deletado(a) com sucesso!');
    }
}

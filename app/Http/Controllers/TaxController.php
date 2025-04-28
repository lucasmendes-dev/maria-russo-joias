<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tax\StoreTaxRequest;
use App\Http\Requests\Tax\UpdateTaxRequest;
use App\Models\Category;
use App\Models\Tax;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaxController extends Controller
{
    public function index()
    {
        $taxes = Tax::all();
        $categories = Category::all(['id', 'name']);
        return Inertia::render('taxes/index', [
            'taxes' => $taxes,
            'categories' => $categories
        ]);
    }

    public function store(StoreTaxRequest $request)
    {
        $data = $request->validated();
        Tax::create($data);

        return redirect()->back()->with('success', 'Taxa "' . $data['name'] . '" cadastrada!');
    }

    public function update(UpdateTaxRequest $request, string $id)
    {
        $tax = Tax::findOrFail($id);
        $data = $request->validated();

        $tax->update($data);

        return redirect()->back()->with('success', 'Os dados da taxa "' . $tax->name . '" foram atualizadas!');
    }

    public function updateActivatedStatus(Request $request, string $id)
    {
        $tax = Tax::findOrFail($id);
        $tax->tax_activated = $request->input('tax_activated');
        $tax->save();

        $taxToastStatus = $request->input('tax_activated') === 1 ? 'ATIVADA' : 'DESATIVADA';

        return response()->json([
            'success' => true,
            'message' => "A taxa '" . $tax->name . "' foi '" . $taxToastStatus . "'"
        ]);
    }

    public function destroy(Tax $tax, string $id)
    {
        $tax = Tax::findOrFail($id);
        $taxName = $tax->name;

        $tax->delete();

        return redirect()->back()->with('success', 'Cliente "' . $taxName . '" deletado(a) com sucesso!');
    }
}

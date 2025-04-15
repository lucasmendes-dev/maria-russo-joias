<?php

namespace App\Http\Controllers;

use App\Http\Requests\Detail\StoreDetailRequest;
use App\Http\Requests\Detail\UpdateDetailRequest;
use App\Models\Detail;
use Inertia\Inertia;

class DetailController extends Controller
{
    public function index()
    {
        $details = Detail::all();
        return Inertia::render('details/index', ['details' => $details]);
    }

    public function store(StoreDetailRequest $request)
    {
        Detail::create($request->validated());

        return redirect()->back()->with('success', 'Detalhe "' . $request->name . '" cadastrado!');
    }

    public function update(UpdateDetailRequest $request, string $id)
    {
        $detail = Detail::findOrFail($id);
        $detail->update($request->validated());

        return redirect()->back()->with('success', 'Os dados do detalhe "' . $detail->name . '" foram atualizados!');
    }

    public function destroy(string $id)
    {
        $detail = Detail::findOrFail($id);
        $detailName = $detail->name;

        $detail->delete();

        return redirect()->back()->with('success', 'Detalhe "' . $detailName . '" deletado com sucesso!');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\Sales\StoreSalesRequest;


class SaleController extends Controller
{
    public function store(StoreSalesRequest $request)
    {
        $data = $request->validated();

        return redirect()->back()->with('success', 'Produto "' . $data['name'] . '" vendido!');
    }
}

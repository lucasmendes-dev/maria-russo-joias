<?php

namespace App\Http\Controllers;

use App\Http\Requests\Debts\StoreDebtRequest;
use App\Http\Requests\Debts\UpdateDebtRequest;
use App\Models\Debt;
use App\Services\ProductService;

class DebtController extends Controller
{
    public function index()
    {
        //
    }

    public function store(StoreDebtRequest $request)
    {
        //
    }

    public function update(UpdateDebtRequest $request, string $id)
    {
        //
    }

    public function updateInstallment(UpdateDebtRequest $request, ProductService $productService)
    {
        $data = $request->validated();
        $data['date'] = formatDate($data['date']);

        Debt::create($data);
        $productService->handleProductStatusAfterUpdateInstallment($data);
        return redirect()->back()->with('success', 'Parcela ' . $data['current_installment'] . ' de ' . $data['installments'] . ' PAGA!');
    }

    public function destroy(string $id)
    {
        //
    }
}

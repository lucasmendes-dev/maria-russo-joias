<?php

namespace App\Http\Controllers;

use App\Http\Requests\Debts\StoreDebtRequest;
use App\Http\Requests\Debts\UpdateDebtRequest;
use App\Models\Debt;

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

    public function destroy(string $id)
    {
        //
    }
}

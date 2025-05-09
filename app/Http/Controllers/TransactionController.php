<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Http\Requests\Transaction\UpdateTransactionRequest;
use App\Models\Transaction;
use App\Services\TransactionService;

class TransactionController extends Controller
{
    public function __construct(private TransactionService $transactionService) {}

    public function index()
    {
        //
    }

    public function storeRevenueTransaction(StoreTransactionRequest $request)
    {
        $data = $this->transactionService->handleCreateData($request->validated());
        // ainda precisa remover quantidade de produto e se acabar marcar como 'sold'
        // criar campo de imagem nas transactions tbm ou ver se dá pra acessar direto com o product_id
        Transaction::create($data);
        return redirect()->back()->with('success', 'Produto "' . $data['name'] . '" vendido!');
    }

    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    public function destroy(Transaction $transaction)
    {
        //
    }
}

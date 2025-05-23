<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Http\Requests\Transaction\UpdateSoldProductRequest;
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

        Transaction::create($data);  // refactor ?

        $this->transactionService->adjustProductStatus($data);
        $this->transactionService->populateDebtTableifSaleHasInstallments($data);

        return redirect()->back()->with('success', 'Produto "' . $data['name'] . '" vendido!');
    }

    public function updatePendingProduct(UpdateTransactionRequest $request)
    {
        $data = $this->transactionService->handleUpdateData($request->validated());
        $transaction = $this->transactionService->getTransactionByProductId($data['product_id']);
        $transaction->update($data);
        
        return redirect()->back()->with('success', 'Os dados do produto pendente "' . $data['name'] . '" foram atualizados!');
    }

    public function updateSoldProduct(UpdateSoldProductRequest $request)
    {
        $data = $this->transactionService->handleUpdateData($request->validated());
        $transaction = $this->transactionService->getTransactionByProductId($data['product_id']);
        $transaction->update($data);

        return redirect()->back()->with('success', 'Os dados do produto vendido "' . $data['name'] . '" foram atualizados!');
    }

    public function destroy(Transaction $transaction)
    {
        //
    }
}

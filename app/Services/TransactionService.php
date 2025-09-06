<?php

namespace App\Services;

use App\Models\BatchSale;
use App\Models\Customer;
use App\Models\Debt;
use App\Models\Product;
use App\Models\Tax;
use App\Models\Transaction;
use DateTime;
use DateTimeZone;

class TransactionService 
{
    public function __construct(private ProductService $productService) {}

    public function handleRevenueCreateData(array $data): array
    {
        $data['type'] = 'revenue';
        $data['customer_id'] = (int) $data['customer_id'];
        $data['price'] = round($data['price'], 2);
        $data['date'] = formatDate($data['date']);
        $data['installments'] = (int) $data['installments'] ?? 1;
        $data['machine_fee'] = $this->getMachineFee($data['payment_method'], $data['installments']);

        return $data;
    }

    public function handleUpdateData(array $data): array
    {
        $data['quantity'] = 1; // refactor ? remover
        $data['type'] = 'revenue';
        $data['date'] = isset($data['sold_date']) ? formatDate($data['sold_date']) : '';
        $data['price'] = isset($data['sold_price']) ? $data['sold_price'] : '';
        $data['installments'] = isset($data['installments']) ? $data['installments'] : 0;
        $data['machine_fee'] = isset($data['payment_method']) && isset($data['installments']) ? $this->getMachineFee($data['payment_method'], $data['installments']) : 0;

        return $data;
    }

    public function handleStoreData(array $data): array
    {
        $data['customer_id'] = Customer::where('id', 45)->exists() ? 45 : 1;
        $data['product_id'] = Product::where('id', 45)->exists() ? 45 : 1;
        $data['quantity'] = 1; // refactor ? remover
        $data['payment_method'] = 'pix';
        $data['installments'] = 0;
        return $data;
    }

    private function getMachineFee(string $paymentMethod, string|null $installments) : float
    {
        if ($paymentMethod === 'credit_card' && $this->isInstallmentsHigherThan1($installments)) {
            return Tax::MACHINE_FEE_VALUES[$installments];
        }
        return 0;
    }

    private function isInstallmentsHigherThan1(string|null $installments): bool
    {
        return $installments !== null && (int)$installments > 1;
    }

    public function adjustProductStatus(array $data): void
    {
        $product = Product::findOrFail($data['product_id']);
        $product->status = $this->isInstallmentsHigherThan1($data['installments']) ? 'pending' : 'sold';

        $product->save();
    }

    public function populateDebtTableifSaleHasInstallments(array $data): void
    {
        if ($data['installments'] && $data['installments'] >= 2) {
            $data['installment_value'] = $data['firstInstallmentValue'] ?? 0;
            $data['date'] = formatDate($data['firstInstallmentDate']);
            $data['current_installment'] = $this->setFirstCurrentInstallment($data['firstInstallmentDate']);
            Debt::create($data);
        }
    }

    private function setFirstCurrentInstallment(string $date): int
    {
        $today = new DateTime("now", new DateTimeZone("UTC"));
        $date = new DateTime($date, new DateTimeZone("UTC"));
        return $date > $today ? 0 : 1;
    }

    public function handleCashSale(array $data): void
    {
        foreach ($data['products'] as $product) {
            $productValues = [
                'product_id' => $product['id'],
                'installments' => $data['installmentValue']
            ];
            $this->adjustProductStatus($productValues);

            $transactionData = [];
            $transactionData['type'] = 'revenue';
            $transactionData['customer_id'] = $data['customer'];
            $transactionData['product_id'] = $product['id'];
            $transactionData['quantity'] = 1;
            $transactionData['price'] = $product['selling_price'];
            $transactionData['payment_method'] = $data['paymentMethod'];
            $transactionData['installments'] = $data['installmentValue'];
            $transactionData['date'] = $data['date'];

            Transaction::create($transactionData);
        }
    }

    public function handleInstallmentSale(array $data)
    {
        $storedTransactionID = $this->storeBatchTransactionData($data);
        
        $batchSaleData = [];
        foreach ($data['products'] as $product) {
            $batchSaleData['transaction_id'] = $storedTransactionID;
            $batchSaleData['customer_id'] = $data['customer'];
            $batchSaleData['product_id'] = $product['id'];
            BatchSale::create($batchSaleData);

            $productObj = Product::findOrFail($product['id']);
            $productObj->status = null;
            $productObj->save();
        }

        //adicionar valores na Debt, remover product como obrigatório
        $debtData = [];
        $debtData['customer_id'] = $data['customer'];
        $debtData['installments'] = $data['installmentValue'];
        $debtData['current_installment'] = 0;
        $debtData['installment_value'] = 0;
        $debtData['date'] = $data['date'];
        $debtData['transaction_id'] = $storedTransactionID;
        Debt::create($debtData);
    }

    private function storeBatchTransactionData(array $data): int
    {
        $transactionData = [];
        $transactionData['type'] = 'revenue';
        $transactionData['customer_id'] = $data['customer'];
        $transactionData['product_id'] = null;
        $transactionData['quantity'] = 1;
        $transactionData['price'] = $data['batchPrice'];
        $transactionData['payment_method'] = $data['paymentMethod'];
        $transactionData['installments'] = $data['installmentValue'];
        $transactionData['date'] = $data['date'];
        $transactionData['batch_sale'] = 1;

        $transaction = Transaction::create($transactionData);
        return $transaction->id;
    }
}

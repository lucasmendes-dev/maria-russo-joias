<?php

namespace App\Services;

use App\Models\Debt;
use App\Models\Tax;
use App\Models\Transaction;
use DateTime;
use DateTimeZone;

class TransactionService 
{
    public function __construct(private ProductService $productService) {}

    public function handleCreateData(array $data): array
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
        $product = $this->productService->getProductByID($data['product_id']);
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

    public function getTransactionByProductId(int $productID): Transaction
    {
        return Transaction::where('product_id', $productID)->first();
    }
}

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
        $data['date'] = $this->formatDate($data['date']);
        $data['installments'] = (int) $data['installments'] ?? 1;
        $data['machine_fee'] = $this->getMachineFee($data['payment_method'], $data['installments']);

        return $data;
    }

    private function formatDate(string $date): string
    {
        $dateUTC = new DateTime($date, new DateTimeZone('UTC'));
        $dateUTC->setTimezone(new DateTimeZone('America/Sao_Paulo'));

        return $dateUTC->format('Y-m-d');
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
            $data['installment_value'] = $data['firstInstallmentValue'];
            $data['date'] = $this->formatDate($data['firstInstallmentDate']);
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

    private function getTransactionIdByProductAndCustomer($productID, $customerID): int
    {
        return Transaction::where('product_id', $productID)->where('customer_id', $customerID)->value('id');
    }
}

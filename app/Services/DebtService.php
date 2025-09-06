<?php

namespace App\Services;

use App\Models\Debt;
use Carbon\Carbon;

class DebtService 
{
    public function __construct() {}

    public function getDateToEndInstallments(int $installments, int $currentInstallment): string
    {
        $numberOfRemainingMonths = $installments - $currentInstallment;
        $dateToEnd = Carbon::now()->addMonths($numberOfRemainingMonths);
        return $dateToEnd->format('Y-m-d');
    }

    public function getPendingProductPaidValue(string $id, bool $transaction = false)
    {
        $productDebts = Debt::getInstallmentValueByID($id);
        if ($transaction) {
            $productDebts = Debt::getInstallmentValueByTransactionID($id);
        }
        return array_sum($productDebts);
    }
}

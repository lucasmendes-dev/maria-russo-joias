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

    public function getPendingProductPaidValue(string $productId)
    {
        $productDebts = Debt::getInstallmentValueByID($productId);
        return array_sum($productDebts);
    }
}

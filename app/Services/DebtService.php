<?php

namespace App\Services;

use App\Models\Debt;
use Carbon\Carbon;

class DebtService 
{
    public function __construct() {}

    public function getLastInstallmentFromTransaction(string $transactionID): Debt | null
    {
        $lastDate = Debt::where('transaction_id', $transactionID)->max('date');
        return Debt::where('transaction_id', $transactionID)
                   ->where('date', $lastDate)
                   ->first();
    }

    public function getDateToEndInstallments(int $installments, int $currentInstallment): string
    {
        $numberOfRemainingMonths = $installments - $currentInstallment;
        $dateToEnd = Carbon::now()->addMonths($numberOfRemainingMonths);
        return $dateToEnd->format('d/m/Y');
    }
}

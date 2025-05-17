<?php

namespace App\Services;

use App\Models\Debt;
use Carbon\Carbon;

class DebtService 
{
    public function __construct() {}

    public function getLastInstallmentFromProduct(string $productID): Debt | null
    {
        $lastDate = Debt::where('product_id', $productID)->max('date');
        return Debt::where('product_id', $productID)
                   ->where('date', $lastDate)
                   ->first();
    }

    public function getDateToEndInstallments(int $installments, int $currentInstallment): string
    {
        $numberOfRemainingMonths = $installments - $currentInstallment;
        $dateToEnd = Carbon::now()->addMonths($numberOfRemainingMonths);
        return $dateToEnd->format('Y-m-d');
    }

    public function getPendingProductPaidValue(string $productId)
    {
        $productDebts = Debt::where('product_id', $productId)->pluck('installment_value');
        
    }
}

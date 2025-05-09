<?php

namespace App\Services;

use App\Models\Tax;
use DateTime;
use DateTimeZone;

class TransactionService 
{
    public function __construct() {}

    public function handleCreateData(array $data): array
    {
        $data['type'] = 'revenue';
        $data['customer_id'] = (int) $data['customer_id']; // corrigir tipo de dado pra não fazer casting
        $data['price'] = round($data['price'], 2);
        $data['date'] = $this->formatDate($data['date']);
        $data['installments'] = (int) $data['installments'] ?? 1; // corrigir tipo de dado pra não fazer casting
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
        if ($paymentMethod === 'credit_card' && ($installments !== null || $installments !== "1")) {
            return Tax::MACHINE_FEE_VALUES[$installments];
        }
        return 0;
    }
}

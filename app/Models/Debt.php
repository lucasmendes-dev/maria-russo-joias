<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Transaction;

class Debt extends Model
{
    protected $fillable = [
        'product_id',
        'customer_id',
        'installments',
        'current_installment',
        'installment_value',
        'date',
        'transaction_id',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public static function getInstallmentValueByID(string $productId): array
    {
        return self::where('product_id', $productId)->pluck('installment_value')->toArray();
    }

    public static function getLastInstallmentFromProduct(string $id, bool $transaction = false): self | null
    {
        $searchColumn = $transaction ? 'transaction_id' : 'product_id';
        $lastDate = self::where($searchColumn, $id)->max('created_at');
        return self::where($searchColumn, $id)
            ->where('created_at', $lastDate)
            ->first();
    }

    public static function getProductDebtsByID(int $id, int $customerID, bool $transaction = false): Collection
    {
        $searchColumn = $transaction ? 'transaction_id' : 'product_id';
        return self::where($searchColumn, $id)
            ->where('customer_id', $customerID)
            ->orderBy('date', 'desc')
            ->get();
    }

    public static function getInstallmentByTransactionID(string $transactionID): self
    {
        return self::where('transaction_id', $transactionID)->orderBy('created_at', 'desc')->first();
    }

    public static function getInstallmentValueByTransactionID(string $transactionID): array
    {
        return self::where('transaction_id', $transactionID)->pluck('installment_value')->toArray();
    }
}

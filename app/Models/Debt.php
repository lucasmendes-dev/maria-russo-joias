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
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public static function getInstallmentValueByID(string $productId): array
    {
        return self::where('product_id', $productId)->pluck('installment_value')->toArray();
    }

    public static function getLastInstallmentFromProduct(string $productID): self | null
    {
        $lastDate = self::where('product_id', $productID)->max('created_at');
        return self::where('product_id', $productID)
            ->where('created_at', $lastDate)
            ->first();
    }

    public static function getProductDebtsByID(int $productID, int $customerID): Collection
    {
        return self::where('product_id', $productID)
            ->where('customer_id', $customerID)
            ->orderBy('date', 'desc')
            ->get();
    }
}

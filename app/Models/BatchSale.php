<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatchSale extends Model
{
    protected $fillable = [
        'transaction_id',
        'customer_id',
        'product_id',
    ];

    public static function getPendingBatchProducts(int $customerID, int $transactionID): array
    {
        return self::where('customer_id', $customerID)->where('transaction_id', $transactionID)->pluck('product_id')->toArray();
    }

    public static function getBatchTransactionID(int $productID)
    {
        return self::where('product_id', $productID)->value('transaction_id');
    }
}

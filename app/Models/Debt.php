<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}

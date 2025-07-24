<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Collection;

class Transaction extends Model
{
    protected $fillable = [
        'type',
        'customer_id',
        'product_id',
        'quantity',
        'price',
        'payment_method',
        'discount',
        'installments',
        'machine_fee',
        'date',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public static function getRevenueValueByMonth(): Collection
    {
        return self::selectRaw('
            DATE_FORMAT(date, "%Y-%m") as month_key,
            DATE_FORMAT(date, "%m") as month_number,
            SUM(price) as total_price
        ')
        ->where('type', 'revenue')
        ->groupByRaw('DATE_FORMAT(date, "%Y-%m"), DATE_FORMAT(date, "%m")')
        ->orderBy('month_key')
        ->get();
    }

    public static function getTotalProductsSoldByMonth(): Collection
    {
        return self::selectRaw('
            DATE_FORMAT(date, "%Y-%m") as month_key,
            DATE_FORMAT(date, "%m") as month_number,
            COUNT(*) as sold_products
        ')
        ->groupByRaw('DATE_FORMAT(date, "%Y-%m"), DATE_FORMAT(date, "%m")')
        ->orderBy('month_key')
        ->get();
    }

    public static function getTransactionPriceByID(string $productId): float
    {
        return self::where('product_id', $productId)->value('price');
    }

    public static function getTotalRevenue(): float
    {
        return self::selectRaw('SUM(price) as price')->where('type', 'revenue')->value('price');
    }

    public static function getTotalTransactionCosts(): float
    {
        return self::selectRaw('SUM(price) as price')->where('type', 'cost')->value('price') ?? 0;
    }
}

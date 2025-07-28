<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Collection;

class Product extends Model
{
    protected $fillable = [
        'name',
        'quantity',
        'price',
        'category_id',
        'description',
        'color',
        'purchase_date',
        'supplier_id',
        'image',
        'status',
    ];

    public function customers()
    {
        return $this->belongsToMany(Customer::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public static function getProductCostsByMonth(): Collection
    {
        return self::selectRaw('
            DATE_FORMAT(purchase_date, "%Y-%m") as month_key,
            DATE_FORMAT(purchase_date, "%m") as month_number,
            SUM(price) as total_price
        ')
        ->groupByRaw('DATE_FORMAT(purchase_date, "%Y-%m"), DATE_FORMAT(purchase_date, "%m")')
        ->orderBy('month_key')
        ->get();
    }

    public static function getTotalJewelrySold(): int
    {
        return self::where('status', 'sold')->count();
    }

    public static function getPendingProducts(): Collection
    {
        return self::where('status', 'pending')->get();
    }

    public static function getTotalProductCosts(): float
    {
        return self::selectRaw('SUM(price) as price')->where('status', 'sold')->value('price');
    }

    public static function getJewelryInventoryValue(): float
    {
        return self::selectRaw('SUM(price) as price')->where('status', 'available')->value('price');
    }

    public static function getProductNameByID(string $productID): string
    {
        return self::where('id', $productID)->value('name');
    }

    public static function getAllProductsGroupedByStatus(): Collection
    {
        return self::orderBy('name', 'asc')->get()->groupBy('status');
    }

    public static function getAvailableProducts(): Collection
    {
        return self::where('status', 'available')->get();
    }

    public static function getProductsByPurchaseDateRange(Tax $tax): Collection
    {
        return self::where('status', 'available')->whereBetween('purchase_date', [$tax->start_date, $tax->end_date])->get();
    }
}

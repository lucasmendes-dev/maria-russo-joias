<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Collection;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'local',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public static function getCustomerNameByID(string $customerID): string
    {
        return self::where('id', $customerID)->value('name');
    }

    public static function getAllCustomersSortedByName(): Collection
    {
        return self::select('id', 'name')->orderBy('name', 'asc')->get();
    }
}

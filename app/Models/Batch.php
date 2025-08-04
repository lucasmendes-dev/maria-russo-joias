<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Collection;

use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    protected $fillable = [
        'name',
        'color',
        'start_date',
        'end_date',
    ];

    public static function getAllBatchesOrderedByDate(): Collection
    {
        return self::orderBy('start_date', 'asc')->get();
    }

    public static function getBatchStartAndEndDates(): Collection
    {
        return self::all(['start_date', 'end_date']);
    }

    public static function findBatchByPurchaseDate(string $purchaseDate): self | null
    {
        return self::select('name', 'color')
            ->where('start_date', '<=', $purchaseDate)
            ->where('end_date', '>=', $purchaseDate)
            ->first();
    }
}

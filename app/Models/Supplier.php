<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'social_media',
        'local',
        'saller_name',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public static function getIdAndNameFromAllSuppliers(): Collection
    {
        return self::select(['id', 'name'])->orderBy('name', 'asc')->get();
    }
}

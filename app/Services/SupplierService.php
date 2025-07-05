<?php

namespace App\Services;

use App\Models\Supplier;

class SupplierService 
{
    public function __construct() {}

    public function getIdAndNameFromAllSuppliers()
    {
        return Supplier::select(['id', 'name'])->orderBy('name', 'asc')->get();
    }
}

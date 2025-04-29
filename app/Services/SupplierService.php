<?php

namespace App\Services;

use App\Models\Supplier;

class SupplierService 
{
    public function __construct() {}

    public function getIdAndNameFromAllSuppliers()
    {
        return Supplier::all(['id', 'name']);
    }
}

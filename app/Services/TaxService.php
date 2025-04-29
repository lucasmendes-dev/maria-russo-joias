<?php

namespace App\Services;

use App\Models\Tax;
use Illuminate\Database\Eloquent\Collection;

class TaxService 
{
    public function __construct() {}

    public function getAllTaxes(): Collection
    {
        return Tax::all();
    }

    public function getAllActivatedTaxes(): Collection
    {
        return Tax::where('tax_activated', 1)->get();
    }
}

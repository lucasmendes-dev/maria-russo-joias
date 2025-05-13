<?php

namespace App\Services;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Collection;

class CustomerService 
{
    public function __construct() {}

    public function getAllCustomersSortedByName(): Collection
    {
        return Customer::select('id', 'name')->orderBy('name', 'asc')->get();
    }

    public function getCustomerNameByID(string $customerID): string
    {
        return Customer::where('id', $customerID)->value('name');
    }
}

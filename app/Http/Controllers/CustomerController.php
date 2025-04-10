<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\StoreCustomerRequest;
use App\Http\Requests\Customer\UpdateCustomerRequest;
use App\Models\Customer;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('customers/index', ['customers' => $customers]);
    }

    public function create()
    {
        //
    }

    public function store(StoreCustomerRequest $request)
    {
        //
    }

    public function show(Customer $customer)
    {
        //
    }

    public function edit(Customer $customer)
    {
        //
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return redirect()->back()->with('success', 'Cliente deletado com sucesso!');
    }
}

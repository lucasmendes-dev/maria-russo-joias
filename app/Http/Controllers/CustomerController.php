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

    public function store(StoreCustomerRequest $request)
    {
        //
    }

    public function update(UpdateCustomerRequest $request, string $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->validated());
        return redirect()->back()->with('success', 'Os dados do(a) cliente "' . $customer->name . '" foram atualizados!');
    }

    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);
        $customerName = $customer->name;
        $customer->delete();
        return redirect()->back()->with('success', 'Cliente "' . $customerName . '" deletado(a) com sucesso!');
    }
}

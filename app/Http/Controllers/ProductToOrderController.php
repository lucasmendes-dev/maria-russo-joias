<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductToOrder\StoreProductToOrderRequest;
use App\Http\Requests\ProductToOrder\UpdateProductToOrderRequest;
use App\Models\ProductToOrder;
use Inertia\Inertia;

class ProductToOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('products-to-order/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductToOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductToOrder $productToOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductToOrder $productToOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductToOrderRequest $request, ProductToOrder $productToOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductToOrder $productToOrder)
    {
        //
    }
}

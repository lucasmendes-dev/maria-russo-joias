<?php

use App\Models\Customer;
use App\Models\Debt;
use App\Models\Product;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access debt installment route', function () {
    $this->put('/updateInstallment/1', [])->assertRedirect('/login');
});

test('user can pay installment and product remains pending if not the last one', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create([
        'status' => 'pending',
    ]);

    $data = [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'installments' => 3,
        'current_installment' => 2,
        'installment_value' => 50.00,
        'date' => '2026-06-03',
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->put("/updateInstallment/{$product->id}", $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Parcela 2 de 3 PAGA!');
    
    // Check that debt is stored
    $this->assertDatabaseHas('debts', [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'installments' => 3,
        'current_installment' => 2,
        'installment_value' => 50.00,
        'date' => '2026-06-03',
    ]);

    // Status should still be pending
    $product->refresh();
    expect($product->status)->toBe('pending');
});

test('user pays last installment and product status changes to sold', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create([
        'status' => 'pending',
    ]);

    $data = [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'installments' => 3,
        'current_installment' => 3,
        'installment_value' => 50.00,
        'date' => '2026-06-03',
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->put("/updateInstallment/{$product->id}", $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Parcela 3 de 3 PAGA!');
    
    // Check that debt is stored
    $this->assertDatabaseHas('debts', [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'installments' => 3,
        'current_installment' => 3,
    ]);

    // Status should change to sold
    $product->refresh();
    expect($product->status)->toBe('sold');
});

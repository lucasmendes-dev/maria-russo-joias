<?php

use App\Models\Customer;
use App\Models\Product;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot reserve product', function () {
    $this->post('/reserveProduct', [])->assertRedirect('/login');
});

test('authenticated user can reserve a product successfully', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create([
        'status' => 'available',
    ]);

    $data = [
        'name' => 'Reserva do colar',
        'product_id' => $product->id,
        'customer_id' => (string) $customer->id,
        'reserved_value' => 120.00,
        'reserved_date' => '2026-06-03',
        'description' => 'Reserva para aniversário',
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->post('/reserveProduct', $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Produto "Reserva do colar" reservado!');

    $this->assertDatabaseHas('reserveds', [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'reserved_value' => 120.00,
        'reserved_date' => '2026-06-03',
        'description' => 'Reserva para aniversário',
    ]);

    $product->refresh();
    expect($product->status)->toBe('reserved');
});

<?php

use App\Models\Customer;
use App\Models\Debt;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access transaction routes', function () {
    $this->post('/transactions', [])->assertRedirect('/login');
    $this->post('/revenueTransaction', [])->assertRedirect('/login');
    $this->put('/updatePendingProduct/1', [])->assertRedirect('/login');
    $this->put('/transactions/1', [])->assertRedirect('/login');
});

test('user can store a simple transaction', function () {
    // TransactionService::handleStoreData uses id 45 or 1
    $customer = Customer::factory()->create(['id' => 1]);
    $product = Product::factory()->create(['id' => 1]);

    $data = [
        'description' => 'Despesa Lixa de Polimento',
        'price' => 15.00,
        'type' => 'cost',
        'date' => '2026-06-03',
    ];

    $response = $this->actingAs($this->user)
        ->from('/dashboard')
        ->post('/transactions', $data);

    $response->assertRedirect('/dashboard');
    $response->assertSessionHas('success', 'Transação "Despesa Lixa de Polimento" cadastrada!');
    $this->assertDatabaseHas('transactions', [
        'description' => 'Despesa Lixa de Polimento',
        'price' => 15.00,
        'customer_id' => 1,
        'product_id' => 1,
        'type' => 'cost',
    ]);
});

test('user can store a revenue transaction for cash sale (installments <= 1)', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create(['status' => 'available']);

    $data = [
        'product_id' => $product->id,
        'name' => 'Venda de Anel à Vista',
        'price' => 200.00,
        'quantity' => 1,
        'payment_method' => 'pix',
        'customer_id' => (string) $customer->id,
        'discount' => 10.00,
        'installments' => 1,
        'date' => '2026-06-03',
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->post('/revenueTransaction', $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Produto "Venda de Anel à Vista" vendido!');

    // Product status should be sold
    $product->refresh();
    expect($product->status)->toBe('sold');

    $this->assertDatabaseHas('transactions', [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'price' => 200.00,
        'type' => 'revenue',
        'installments' => 1,
    ]);

    // No debts should be created
    $this->assertDatabaseMissing('debts', [
        'product_id' => $product->id,
    ]);
});

test('user can store a revenue transaction for installment sale (installments >= 2)', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create(['status' => 'available']);

    $data = [
        'product_id' => $product->id,
        'name' => 'Venda de Anel a Prazo',
        'price' => 300.00,
        'quantity' => 1,
        'payment_method' => 'credit_card',
        'customer_id' => (string) $customer->id,
        'discount' => 0.00,
        'installments' => 3,
        'date' => '2026-06-03',
        'firstInstallmentDate' => '2026-06-10',
        'firstInstallmentValue' => 100.00,
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->post('/revenueTransaction', $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Produto "Venda de Anel a Prazo" vendido!');

    // Product status should be pending
    $product->refresh();
    expect($product->status)->toBe('pending');

    $this->assertDatabaseHas('transactions', [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'price' => 300.00,
        'type' => 'revenue',
        'installments' => 3,
    ]);

    // Debts should contain the first installment details
    $this->assertDatabaseHas('debts', [
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'installments' => 3,
        'installment_value' => 100.00,
        'date' => '2026-06-10',
    ]);
});

test('user can update pending product transaction', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create(['status' => 'pending']);
    $transaction = Transaction::factory()->create([
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'type' => 'revenue',
        'price' => 300.00,
    ]);

    $data = [
        'product_id' => $product->id,
        'name' => 'Venda Pendente Atualizada',
        'sold_price' => 280.00,
        'quantity' => 1,
        'payment_method' => 'pix',
        'customer_id' => $customer->id,
        'discount' => 20.00,
        'installments' => 2,
        'current_installment' => 1,
        'sold_date' => '2026-06-05',
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->put("/updatePendingProduct/{$product->id}", $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Os dados do produto pendente "Venda Pendente Atualizada" foram atualizados!');

    $transaction->refresh();
    expect($transaction->price)->toBe(280.00);
    expect($transaction->payment_method)->toBe('pix');
    expect($transaction->date)->toBe('2026-06-05');
});

test('user can update sold product transaction', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create(['status' => 'sold']);
    $transaction = Transaction::factory()->create([
        'product_id' => $product->id,
        'customer_id' => $customer->id,
        'type' => 'revenue',
        'price' => 150.00,
    ]);

    $data = [
        'product_id' => $product->id,
        'name' => 'Venda Concluída Atualizada',
        'sold_price' => 170.00,
        'payment_method' => 'credit_card',
        'discount' => 5.00,
        'sold_date' => '2026-06-06',
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->put("/transactions/{$product->id}", $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Os dados do produto vendido "Venda Concluída Atualizada" foram atualizados!');

    $transaction->refresh();
    expect($transaction->price)->toBe(170.00);
    expect($transaction->payment_method)->toBe('credit_card');
    expect($transaction->date)->toBe('2026-06-06');
});

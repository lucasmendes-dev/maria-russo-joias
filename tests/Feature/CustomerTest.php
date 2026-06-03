<?php

use App\Models\Customer;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access customer routes', function () {
    $this->get('/customers')->assertRedirect('/login');
    $this->post('/customers', [])->assertRedirect('/login');
    $this->put('/customers/1', [])->assertRedirect('/login');
    $this->delete('/customers/1')->assertRedirect('/login');
});

test('authenticated user can view customers index', function () {
    Customer::factory()->create(['name' => 'Maria Silva']);
    Customer::factory()->create(['name' => 'Ana Souza']);

    $response = $this->actingAs($this->user)->get('/customers');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('customers/index')
        ->has('customers', 2)
        // Sorted by name asc: Ana Souza should be first, Maria Silva second
        ->where('customers.0.name', 'Ana Souza')
        ->where('customers.1.name', 'Maria Silva')
    );
});

test('user can store a new customer', function () {
    $data = [
        'name' => 'Lucas Mendes',
        'phone' => '(11) 98765-4321',
        'local' => 'São Paulo - SP',
    ];

    $response = $this->actingAs($this->user)
        ->from('/customers')
        ->post('/customers', $data);

    $response->assertRedirect('/customers');
    $response->assertSessionHas('success', 'Cliente "Lucas Mendes" cadastrado!');
    $this->assertDatabaseHas('customers', [
        'name' => 'Lucas Mendes',
        'phone' => '11987654321', // cleaned phone number
        'local' => 'São Paulo - SP',
    ]);
});

test('user can update a customer', function () {
    $customer = Customer::factory()->create([
        'name' => 'Lucas Mendes',
        'phone' => '11987654321',
        'local' => 'São Paulo - SP',
    ]);

    $data = [
        'name' => 'Lucas Mendes Atualizado',
        'phone' => '(11) 91234-5678',
        'local' => 'Rio de Janeiro - RJ',
    ];

    $response = $this->actingAs($this->user)
        ->from('/customers')
        ->put("/customers/{$customer->id}", $data);

    $response->assertRedirect('/customers');
    $response->assertSessionHas('success', 'Os dados do(a) cliente "Lucas Mendes Atualizado" foram atualizados!');
    $this->assertDatabaseHas('customers', [
        'id' => $customer->id,
        'name' => 'Lucas Mendes Atualizado',
        'phone' => '11912345678', // cleaned phone number
        'local' => 'Rio de Janeiro - RJ',
    ]);
});

test('user can delete a customer', function () {
    $customer = Customer::factory()->create([
        'name' => 'Cliente para Deletar',
    ]);

    $response = $this->actingAs($this->user)
        ->from('/customers')
        ->delete("/customers/{$customer->id}");

    $response->assertRedirect('/customers');
    $response->assertSessionHas('success', 'Cliente "Cliente para Deletar" deletado(a) com sucesso!');
    $this->assertDatabaseMissing('customers', [
        'id' => $customer->id,
    ]);
});

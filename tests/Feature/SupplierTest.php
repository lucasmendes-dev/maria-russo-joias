<?php

use App\Models\Supplier;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access supplier routes', function () {
    $this->get('/suppliers')->assertRedirect('/login');
    $this->post('/suppliers', [])->assertRedirect('/login');
    $this->put('/suppliers/1', [])->assertRedirect('/login');
    $this->delete('/suppliers/1')->assertRedirect('/login');
});

test('authenticated user can view suppliers index', function () {
    Supplier::factory()->count(2)->create();

    $response = $this->actingAs($this->user)->get('/suppliers');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('suppliers/index')
        ->has('suppliers', 2)
    );
});

test('user can store a new supplier', function () {
    $data = [
        'name' => 'Fornecedor A',
        'phone' => '(11) 98765-4321',
        'social_media' => '@fornecedora',
        'local' => 'Limeira - SP',
        'saller_name' => 'Roberto',
    ];

    $response = $this->actingAs($this->user)
        ->from('/suppliers')
        ->post('/suppliers', $data);

    $response->assertRedirect('/suppliers');
    $response->assertSessionHas('success', 'Fornecedor "Fornecedor A" cadastrado!');
    $this->assertDatabaseHas('suppliers', [
        'name' => 'Fornecedor A',
        'phone' => '11987654321', // cleaned phone number
        'social_media' => '@fornecedora',
        'local' => 'Limeira - SP',
        'saller_name' => 'Roberto',
    ]);
});

test('user can update a supplier', function () {
    $supplier = Supplier::factory()->create([
        'name' => 'Fornecedor Original',
        'phone' => '11987654321',
    ]);

    $data = [
        'name' => 'Fornecedor Atualizado',
        'phone' => '(11) 91234-5678',
        'social_media' => '@fornecedornew',
        'local' => 'Belo Horizonte - MG',
        'saller_name' => 'Carlos',
    ];

    $response = $this->actingAs($this->user)
        ->from('/suppliers')
        ->put("/suppliers/{$supplier->id}", $data);

    $response->assertRedirect('/suppliers');
    $response->assertSessionHas('success', 'Os dados do fornecedor "Fornecedor Atualizado" foram atualizados!');
    $this->assertDatabaseHas('suppliers', [
        'id' => $supplier->id,
        'name' => 'Fornecedor Atualizado',
        'phone' => '11912345678', // cleaned phone number
        'local' => 'Belo Horizonte - MG',
        'saller_name' => 'Carlos',
    ]);
});

test('user can delete a supplier', function () {
    $supplier = Supplier::factory()->create([
        'name' => 'Fornecedor para Deletar',
    ]);

    $response = $this->actingAs($this->user)
        ->from('/suppliers')
        ->delete("/suppliers/{$supplier->id}");

    $response->assertRedirect('/suppliers');
    $response->assertSessionHas('success', 'Fornecedor "Fornecedor para Deletar" deletado(a) com sucesso!');
    $this->assertDatabaseMissing('suppliers', [
        'id' => $supplier->id,
    ]);
});

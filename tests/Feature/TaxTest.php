<?php

use App\Models\Category;
use App\Models\Tax;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access tax routes', function () {
    $this->get('/taxes')->assertRedirect('/login');
    $this->post('/taxes', [])->assertRedirect('/login');
    $this->put('/taxes/1', [])->assertRedirect('/login');
    $this->patch('/updateActivatedStatus/1', [])->assertRedirect('/login');
    $this->delete('/taxes/1')->assertRedirect('/login');
});

test('authenticated user can view taxes index', function () {
    $category = Category::factory()->create();
    Tax::factory()->count(2)->create(['category_id' => $category->id]);

    $response = $this->actingAs($this->user)->get('/taxes');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('taxes/index')
        ->has('taxes', 2)
        ->has('categories', 1)
    );
});

test('user can store a new tax', function () {
    $category = Category::factory()->create();

    $data = [
        'name' => 'Taxa de Envio',
        'percentage' => 10.0,
        'price' => null,
        'category_id' => $category->id,
        'description' => 'Taxa para envio padrão',
        'start_date' => '2026-06-01',
        'end_date' => '2026-06-30',
        'spread_tax' => false,
        'tax_activated' => true,
    ];

    $response = $this->actingAs($this->user)
        ->from('/taxes')
        ->post('/taxes', $data);

    $response->assertRedirect('/taxes');
    $response->assertSessionHas('success', 'Taxa "Taxa de Envio" cadastrada!');
    $this->assertDatabaseHas('taxes', [
        'name' => 'Taxa de Envio',
        'percentage' => 10.0,
        'category_id' => $category->id,
        'spread_tax' => 0,
        'tax_activated' => 1,
    ]);
});

test('user can update a tax', function () {
    $category = Category::factory()->create();
    $tax = Tax::factory()->create(['category_id' => $category->id]);

    $data = [
        'name' => 'Taxa de Envio Atualizada',
        'percentage' => null,
        'price' => 15.50,
        'category_id' => $category->id,
        'description' => 'Novo valor de taxa',
        'start_date' => null,
        'end_date' => null,
        'spread_tax' => true,
        'tax_activated' => false,
    ];

    $response = $this->actingAs($this->user)
        ->from('/taxes')
        ->put("/taxes/{$tax->id}", $data);

    $response->assertRedirect('/taxes');
    $response->assertSessionHas('success', 'Os dados da taxa "Taxa de Envio Atualizada" foram atualizadas!');
    $this->assertDatabaseHas('taxes', [
        'id' => $tax->id,
        'name' => 'Taxa de Envio Atualizada',
        'price' => 15.50,
        'spread_tax' => 1,
        'tax_activated' => 0,
    ]);
});

test('user can toggle active status of a tax', function () {
    $category = Category::factory()->create();
    $tax = Tax::factory()->create([
        'name' => 'Taxa Teste',
        'category_id' => $category->id,
        'tax_activated' => 0,
    ]);

    // Activate the tax
    $response = $this->actingAs($this->user)
        ->patchJson("/updateActivatedStatus/{$tax->id}", [
            'tax_activated' => 1,
        ]);

    $response->assertStatus(200);
    $response->assertJson([
        'success' => true,
        'message' => "A taxa 'Taxa Teste' foi 'ATIVADA'",
    ]);

    $tax->refresh();
    expect($tax->tax_activated)->toBe(1);

    // Deactivate the tax
    $response = $this->actingAs($this->user)
        ->patchJson("/updateActivatedStatus/{$tax->id}", [
            'tax_activated' => 0,
        ]);

    $response->assertStatus(200);
    $response->assertJson([
        'success' => true,
        'message' => "A taxa 'Taxa Teste' foi 'DESATIVADA'",
    ]);

    $tax->refresh();
    expect($tax->tax_activated)->toBe(0);
});

test('user can delete a tax', function () {
    $category = Category::factory()->create();
    $tax = Tax::factory()->create([
        'name' => 'Taxa a Deletar',
        'category_id' => $category->id,
    ]);

    $response = $this->actingAs($this->user)
        ->from('/taxes')
        ->delete("/taxes/{$tax->id}");

    $response->assertRedirect('/taxes');
    $response->assertSessionHas('success', 'Cliente "Taxa a Deletar" deletado(a) com sucesso!'); // Controller uses "Cliente" by mistake in response message
    $this->assertDatabaseMissing('taxes', [
        'id' => $tax->id,
    ]);
});

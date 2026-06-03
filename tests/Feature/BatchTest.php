<?php

use App\Models\Batch;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access batch routes', function () {
    $this->get('/batches')->assertRedirect('/login');
    $this->post('/batches', [])->assertRedirect('/login');
    $this->put('/batches/1', [])->assertRedirect('/login');
    $this->delete('/batches/1')->assertRedirect('/login');
});

test('authenticated user can view batches index', function () {
    $batches = Batch::factory()->count(3)->create();

    $response = $this->actingAs($this->user)->get('/batches');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('batches/index')
        ->has('batches', 3)
    );
});

test('user can store a new batch without date conflict', function () {
    // No conflicting batch in DB
    $data = [
        'name' => 'Lote Teste',
        'color' => '#ffffff',
        'start_date' => '2026-06-01',
        'end_date' => '2026-06-30',
    ];

    $response = $this->actingAs($this->user)
        ->from('/batches')
        ->post('/batches', $data);

    $response->assertRedirect('/batches');
    $response->assertSessionHas('success', 'Lote "Lote Teste" cadastrado!');
    $this->assertDatabaseHas('batches', [
        'name' => 'Lote Teste',
        'color' => '#ffffff',
        'start_date' => '2026-06-01',
        'end_date' => '2026-06-30',
    ]);
});

test('user cannot store a batch with date conflict', function () {
    // Create an existing batch
    Batch::factory()->create([
        'start_date' => '2026-06-01',
        'end_date' => '2026-06-30',
    ]);

    // Attempt to register a batch with conflicting start date
    $data = [
        'name' => 'Lote Conflitante',
        'color' => '#000000',
        'start_date' => '2026-06-15',
        'end_date' => '2026-07-15',
    ];

    $response = $this->actingAs($this->user)
        ->from('/batches')
        ->post('/batches', $data);

    $response->assertRedirect('/batches');
    $response->assertSessionHas('error', 'O período de data do lote que você tentou cadastrar já existe. Cadastre lotes com datas diferentes.');
    $this->assertDatabaseMissing('batches', [
        'name' => 'Lote Conflitante',
    ]);
});

test('user can update a batch', function () {
    $batch = Batch::factory()->create([
        'name' => 'Lote Original',
        'color' => '#123456',
        'start_date' => '2026-01-01',
        'end_date' => '2026-01-31',
    ]);

    $data = [
        'name' => 'Lote Atualizado',
        'color' => '#654321',
        'start_date' => '2026-01-02',
        'end_date' => '2026-01-30',
    ];

    $response = $this->actingAs($this->user)
        ->from('/batches')
        ->put("/batches/{$batch->id}", $data);

    $response->assertRedirect('/batches');
    $response->assertSessionHas('success', 'Os dados do lote "Lote Atualizado" foram atualizados!');
    $this->assertDatabaseHas('batches', [
        'id' => $batch->id,
        'name' => 'Lote Atualizado',
        'color' => '#654321',
    ]);
});

test('user can delete a batch', function () {
    $batch = Batch::factory()->create([
        'name' => 'Lote para Deletar',
    ]);

    $response = $this->actingAs($this->user)
        ->from('/batches')
        ->delete("/batches/{$batch->id}");

    $response->assertRedirect('/batches');
    $response->assertSessionHas('success', 'Lote "Lote para Deletar" deletado com sucesso!');
    $this->assertDatabaseMissing('batches', [
        'id' => $batch->id,
    ]);
});

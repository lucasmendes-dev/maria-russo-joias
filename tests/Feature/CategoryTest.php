<?php

use App\Models\Category;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access category routes', function () {
    $this->get('/categories')->assertRedirect('/login');
    $this->post('/categories', [])->assertRedirect('/login');
    $this->put('/categories/1', [])->assertRedirect('/login');
    $this->delete('/categories/1')->assertRedirect('/login');
});

test('authenticated user can view categories index', function () {
    Category::factory()->create(['name' => 'Colares']);
    Category::factory()->create(['name' => 'Anéis']);

    $response = $this->actingAs($this->user)->get('/categories');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('categories/index')
        ->has('categories', 2)
        // Ordered by name asc: Anéis should be first, Colares second
        ->where('categories.0.name', 'Anéis')
        ->where('categories.1.name', 'Colares')
    );
});

test('user can store a new category', function () {
    $data = [
        'name' => 'Brincos',
        'description' => 'Categoria de brincos de prata',
    ];

    $response = $this->actingAs($this->user)
        ->from('/categories')
        ->post('/categories', $data);

    $response->assertRedirect('/categories');
    $response->assertSessionHas('success', 'Categoria "Brincos" cadastrada!');
    $this->assertDatabaseHas('categories', [
        'name' => 'Brincos',
        'description' => 'Categoria de brincos de prata',
    ]);
});

test('user can update a category', function () {
    $category = Category::factory()->create([
        'name' => 'Pulseiras',
        'description' => 'Pulseiras folheadas',
    ]);

    $data = [
        'name' => 'Pulseiras de Ouro',
        'description' => 'Pulseiras de ouro 18k',
    ];

    $response = $this->actingAs($this->user)
        ->from('/categories')
        ->put("/categories/{$category->id}", $data);

    $response->assertRedirect('/categories');
    $response->assertSessionHas('success', 'Os dados da categoria "Pulseiras de Ouro" foram atualizados!');
    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Pulseiras de Ouro',
        'description' => 'Pulseiras de ouro 18k',
    ]);
});

test('user can delete a category', function () {
    $category = Category::factory()->create([
        'name' => 'Tornozeleiras',
    ]);

    $response = $this->actingAs($this->user)
        ->from('/categories')
        ->delete("/categories/{$category->id}");

    $response->assertRedirect('/categories');
    $response->assertSessionHas('success', 'Categoria "Tornozeleiras" deletada com sucesso!');
    $this->assertDatabaseMissing('categories', [
        'id' => $category->id,
    ]);
});

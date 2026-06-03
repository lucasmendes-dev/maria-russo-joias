<?php

use App\Models\Tax;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access simulation page', function () {
    $this->get('/simulation')->assertRedirect('/login');
});

test('authenticated user can view simulation index with activated taxes', function () {
    $activeTax = Tax::factory()->create([
        'name' => 'Taxa Ativa',
        'tax_activated' => 1,
    ]);

    $inactiveTax = Tax::factory()->create([
        'name' => 'Taxa Inativa',
        'tax_activated' => 0,
    ]);

    $response = $this->actingAs($this->user)->get('/simulation');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('simulation/index')
        ->has('taxes', 1)
        ->where('taxes.0.name', 'Taxa Ativa')
    );
});

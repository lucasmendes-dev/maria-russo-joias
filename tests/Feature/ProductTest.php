<?php

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guest cannot access product routes', function () {
    $this->get('/products')->assertRedirect('/login');
    $this->post('/products', [])->assertRedirect('/login');
    $this->put('/products/1', [])->assertRedirect('/login');
    $this->patch('/cancelReservation/1')->assertRedirect('/login');
    $this->delete('/products/1')->assertRedirect('/login');
});

test('authenticated user can view products index with grouped list and helper data', function () {
    $category = Category::factory()->create();
    $supplier = Supplier::factory()->create();
    $customer = Customer::factory()->create();

    $pAvailable = Product::factory()->create(['status' => 'available', 'category_id' => $category->id, 'supplier_id' => $supplier->id, 'purchase_date' => '2026-06-01']);
    $pReserved = Product::factory()->create(['status' => 'reserved', 'category_id' => $category->id, 'supplier_id' => $supplier->id]);
    $pPending = Product::factory()->create(['status' => 'pending', 'category_id' => $category->id, 'supplier_id' => $supplier->id]);
    $pSold = Product::factory()->create(['status' => 'sold', 'category_id' => $category->id, 'supplier_id' => $supplier->id]);

    \App\Models\Reserved::factory()->create(['product_id' => $pReserved->id, 'customer_id' => $customer->id]);
    \App\Models\Transaction::factory()->create(['product_id' => $pPending->id, 'customer_id' => $customer->id, 'type' => 'revenue']);
    \App\Models\Transaction::factory()->create(['product_id' => $pSold->id, 'customer_id' => $customer->id, 'type' => 'revenue']);

    $response = $this->actingAs($this->user)->get('/products');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('products/index')
        ->has('availableProducts', 1)
        ->has('reservedProducts', 1)
        ->has('pendingProducts', 1)
        ->has('soldProducts', 1)
        ->has('categories')
        ->has('suppliers')
        ->has('customers')
    );
});

test('user can store a new product with default image', function () {
    $category = Category::factory()->create();
    $supplier = Supplier::factory()->create();

    $data = [
        'name' => 'Colar de Prata',
        'quantity' => 1,
        'price' => 120.50,
        'category_id' => $category->id,
        'description' => 'Lindo colar de prata 925',
        'color' => '#c0c0c0',
        'purchase_date' => '2026-06-01',
        'supplier_id' => $supplier->id,
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->post('/products', $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Produto "Colar de Prata" cadastrado!');
    $this->assertDatabaseHas('products', [
        'name' => 'Colar de Prata',
        'status' => 'available',
        'image' => 'images/default_product_avatar.jpg',
    ]);
});

test('user can store a new product with uploaded image', function () {
    Storage::fake('public');
    
    $category = Category::factory()->create();
    $supplier = Supplier::factory()->create();
    $file = UploadedFile::fake()->create('colar.jpg', 100, 'image/jpeg');

    $data = [
        'name' => 'Colar Real',
        'quantity' => 2,
        'price' => 150.00,
        'category_id' => $category->id,
        'purchase_date' => '2026-06-01',
        'supplier_id' => $supplier->id,
        'image' => $file,
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->post('/products', $data);

    $response->assertRedirect('/products');
    
    $product = Product::where('name', 'Colar Real')->first();
    expect($product->image)->not->toBe('images/default_product_avatar.jpg');
    Storage::disk('public')->assertExists('images/' . $product->image);
});

test('user can update product details and image', function () {
    Storage::fake('public');
    $product = Product::factory()->create([
        'name' => 'Anel Original',
        'image' => 'products/old.jpg',
    ]);

    $file = UploadedFile::fake()->create('anel_new.jpg', 100, 'image/jpeg');
    $data = [
        'name' => 'Anel Atualizado',
        'quantity' => 5,
        'price' => 80.00,
        'purchase_date' => '2026-06-02',
        'supplier_id' => $product->supplier_id,
        'category_id' => $product->category_id,
        'image' => $file,
    ];

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->put("/products/{$product->id}", $data);

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Os dados do produto "Anel Atualizado" foram atualizados!');

    $product->refresh();
    expect($product->name)->toBe('Anel Atualizado');
    expect($product->image)->not->toBe('products/old.jpg');
    Storage::disk('public')->assertExists('images/' . $product->image);
});

test('user can cancel reservation of a product', function () {
    $product = Product::factory()->create([
        'status' => 'reserved',
    ]);

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->patch("/cancelReservation/{$product->id}");

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'A reserva do produto ' . $product->name . ' foi DESFEITA.');

    $product->refresh();
    expect($product->status)->toBe('available');
});

test('user can delete a product and its image', function () {
    Storage::fake('public');
    // Place a dummy file in storage
    Storage::disk('public')->put('images/products/to_delete.jpg', 'dummy content');

    $product = Product::factory()->create([
        'name' => 'Produto Deletável',
        'image' => 'products/to_delete.jpg',
    ]);

    $response = $this->actingAs($this->user)
        ->from('/products')
        ->delete("/products/{$product->id}");

    $response->assertRedirect('/products');
    $response->assertSessionHas('success', 'Produto "Produto Deletável" deletado com sucesso!');

    $this->assertDatabaseMissing('products', [
        'id' => $product->id,
    ]);
    Storage::disk('public')->assertMissing('images/products/to_delete.jpg');
});

<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductToOrderController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TaxController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/dashboard');
    }
    return redirect('/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    // Products
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');

    // Taxes
    Route::get('/taxes', [TaxController::class, 'index'])->name('taxes.index');

    // Customers
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');

    // Suppliers
    Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');

    // Products to Order
    Route::get('/products-to-order', [ProductToOrderController::class, 'index'])->name('products-to-order.index');

    // Notes
    Route::get('/notes', [NoteController::class, 'index'])->name('notes.index');
});

<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductToOrderController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\TransactionController;
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
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');

    // Transactions
    Route::post('/revenueTransaction', [TransactionController::class, 'storeRevenueTransaction'])->name('transactions.revenue');

    // Taxes
    Route::get('/taxes', [TaxController::class, 'index'])->name('taxes.index');
    Route::get('/taxes', [TaxController::class, 'index'])->name('taxes.index');
    Route::delete('/taxes/{id}', [TaxController::class, 'destroy'])->name('taxes.destroy');
    Route::put('/taxes/{id}', [TaxController::class, 'update'])->name('taxes.update');
    Route::post('/taxes', [TaxController::class, 'store'])->name('taxes.store');
    Route::patch('/updateActivatedStatus/{id}', [TaxController::class, 'updateActivatedStatus'])->name('taxes.updateActivatedStatus');
    
    // Products to Order
    Route::get('/products-to-order', [ProductToOrderController::class, 'index'])->name('products-to-order.index');

    // Simulation ??
    //Route::get('/simulation', [SimulationController::class, 'index'])->name('simulation.index');

    // Customers
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    Route::put('/customers/{id}', [CustomerController::class, 'update'])->name('customers.update');
    Route::post('/customers', [CustomerController::class, 'store'])->name('customers.store');

    // Suppliers
    Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
    Route::delete('/suppliers/{id}', [SupplierController::class, 'destroy'])->name('suppliers.destroy');
    Route::put('/suppliers/{id}', [SupplierController::class, 'update'])->name('suppliers.update');
    Route::post('/suppliers', [SupplierController::class, 'store'])->name('suppliers.store');

    // Categories
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');

    // Details
    Route::get('/details', [DetailController::class, 'index'])->name('details.index');
    Route::delete('/details/{id}', [DetailController::class, 'destroy'])->name('details.destroy');
    Route::put('/details/{id}', [DetailController::class, 'update'])->name('details.update');
    Route::post('/details', [DetailController::class, 'store'])->name('details.store');
});

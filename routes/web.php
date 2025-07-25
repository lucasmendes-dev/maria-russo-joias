<?php

use App\Http\Controllers\BatchController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DebtController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReservedController;
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

    Route::patch('/cancelReservation/{id}', [ProductController::class, 'cancelReservation'])->name('products.cancelReservation');
    Route::put('/updateInstallment/{id}', [DebtController::class, 'updateInstallment'])->name('debts.updateInstallment');

    // Transactions
    Route::post('/revenueTransaction', [TransactionController::class, 'storeRevenueTransaction'])->name('transactions.revenue');
    Route::put('/updatePendingProduct/{id}', [TransactionController::class, 'updatePendingProduct'])->name('transactions.updatePendingProduct');
    Route::put('/transactions/{id}', [TransactionController::class, 'updateSoldProduct'])->name('transactions.updateSoldProduct');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');


    // Reserved
    Route::post('/reserveProduct', [ReservedController::class, 'storeReservedProduct'])->name('reserveds.reserve');

    // Taxes
    Route::get('/taxes', [TaxController::class, 'index'])->name('taxes.index');
    Route::get('/taxes', [TaxController::class, 'index'])->name('taxes.index');
    Route::delete('/taxes/{id}', [TaxController::class, 'destroy'])->name('taxes.destroy');
    Route::put('/taxes/{id}', [TaxController::class, 'update'])->name('taxes.update');
    Route::post('/taxes', [TaxController::class, 'store'])->name('taxes.store');
    Route::patch('/updateActivatedStatus/{id}', [TaxController::class, 'updateActivatedStatus'])->name('taxes.updateActivatedStatus');

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

    // Batches
    Route::get('/batches', [BatchController::class, 'index'])->name('batches.index');
    Route::delete('/batches/{id}', [BatchController::class, 'destroy'])->name('batches.destroy');
    Route::put('/batches/{id}', [BatchController::class, 'update'])->name('batches.update');
    Route::post('/batches', [BatchController::class, 'store'])->name('batches.store');
});

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('quantity');
            $table->float('price');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->string('color')->nullable();
            $table->date('purchase_date');
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->string('image')->nullable();
            $table->enum('status', ['available', 'reserved', 'pending', 'sold']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

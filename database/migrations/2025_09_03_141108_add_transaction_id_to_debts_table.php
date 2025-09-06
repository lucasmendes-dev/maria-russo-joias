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
        Schema::table('debts', function (Blueprint $table) {
            $table->foreignId('transaction_id')->nullable()->constrained()->onDelete('cascade');

            $table->dropForeign(['product_id']);

            $table->unsignedBigInteger('product_id')->nullable()->change();

            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('debts', function (Blueprint $table) {
            $table->dropColumn('transaction_id');

            $table->dropForeign(['product_id']);

            $table->unsignedBigInteger('product_id')->nullable(false)->change();

            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade');
        });
    }
};

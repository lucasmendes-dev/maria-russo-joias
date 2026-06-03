<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => 'revenue',
            'customer_id' => Customer::factory(),
            'product_id' => Product::factory(),
            'quantity' => 1,
            'price' => $this->faker->randomFloat(2, 50, 5000),
            'payment_method' => $this->faker->randomElement(['pix', 'credit_card', 'cash', 'debit_card']),
            'discount' => null,
            'installments' => 0,
            'machine_fee' => null,
            'date' => $this->faker->date(),
            'description' => null,
        ];
    }

    public function revenue(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'revenue',
        ]);
    }

    public function cost(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'cost',
        ]);
    }

    public function withInstallments(int $installments = 3): static
    {
        return $this->state(fn (array $attributes) => [
            'installments' => $installments,
            'payment_method' => 'credit_card',
        ]);
    }
}

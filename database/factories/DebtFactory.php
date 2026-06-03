<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Debt>
 */
class DebtFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'customer_id' => Customer::factory(),
            'installments' => 3,
            'current_installment' => 1,
            'installment_value' => $this->faker->randomFloat(2, 50, 500),
            'date' => $this->faker->date(),
        ];
    }
}

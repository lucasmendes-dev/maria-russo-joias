<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reserved>
 */
class ReservedFactory extends Factory
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
            'reserved_value' => $this->faker->randomFloat(2, 50, 1000),
            'reserved_date' => $this->faker->date(),
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}

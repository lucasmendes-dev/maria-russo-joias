<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'quantity' => $this->faker->numberBetween(1, 10),
            'price' => $this->faker->randomFloat(2, 10, 5000),
            'category_id' => Category::factory(),
            'description' => $this->faker->optional()->sentence(),
            'color' => $this->faker->optional()->safeColorName(),
            'purchase_date' => $this->faker->date(),
            'supplier_id' => Supplier::factory(),
            'image' => null,
            'status' => 'available',
        ];
    }

    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'available',
        ]);
    }

    public function reserved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'reserved',
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    public function sold(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sold',
        ]);
    }
}

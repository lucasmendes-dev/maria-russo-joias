<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tax>
 */
class TaxFactory extends Factory
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
            'percentage' => $this->faker->randomFloat(2, 1, 50),
            'price' => null,
            'category_id' => Category::factory(),
            'description' => $this->faker->optional()->sentence(),
            'start_date' => null,
            'end_date' => null,
            'spread_tax' => 0,
            'tax_activated' => 1,
        ];
    }

    public function activated(): static
    {
        return $this->state(fn (array $attributes) => [
            'tax_activated' => 1,
        ]);
    }

    public function deactivated(): static
    {
        return $this->state(fn (array $attributes) => [
            'tax_activated' => 0,
        ]);
    }

    public function withTimePeriod(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_date' => now()->subMonth()->format('Y-m-d'),
            'end_date' => now()->addMonth()->format('Y-m-d'),
        ]);
    }

    public function fixedPrice(float $price = 100): static
    {
        return $this->state(fn (array $attributes) => [
            'percentage' => null,
            'price' => $price,
        ]);
    }

    public function spreadTax(): static
    {
        return $this->state(fn (array $attributes) => [
            'percentage' => null,
            'spread_tax' => 1,
        ]);
    }
}

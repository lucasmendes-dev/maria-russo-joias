<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Anel', 'Argola', 'Brinco', 'Colar', 'Conjunto', 'Corrente', 'Pingente', 'Pulseira'];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category,
                'description' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ]);   
        }

        DB::table('categories')->insert([
            'name' => 'Todos',
            'description' => 'Categoria que engloba todos os produtos.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);   
    }
}

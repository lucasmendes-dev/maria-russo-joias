<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class BatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            '#eab308', // Lote 1
            '#10b981', // Lote 2
            '#3b82f6', // Lote 3
            '#8b5cf6', // Lote 4
            '#ec4899', // Lote 5
            '#f97316', // Lote 6
            '#ef4444', // Lote 7
        ];
        
        $batches = [];
        for ($i = 0; $i < 7; $i++) {
            $month = $i + 1;
            $start = Carbon::create(2025, $month, 1);
            $end = $start->copy()->endOfMonth();
        
            $batches[] = [
                'name' => 'Lote ' . ($i + 1),
                'color' => $colors[$i],
                'start_date' => $start->toDateString(),
                'end_date' => $end->toDateString(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        
        DB::table('batches')->insert($batches);
    }
}

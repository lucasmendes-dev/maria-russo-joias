<?php

namespace App\Services;

use App\Models\Batch;
use Illuminate\Database\Eloquent\Collection;

class BatchService 
{
    public function __construct() {}

    public function getAllBatchesOrderedByDate(): Collection
    {
        return Batch::orderBy('start_date', 'asc')->get();
    }

    public function getBatchById(string $id): Batch
    {
        return Batch::findOrFail($id);
    }

    public function checkIfBatchDateConflicts(array $data): bool
    {
        $batchDates = $this->getBatchStartAndEndDates();
        foreach ($batchDates as $batchDate) {
            if ($data['start_date'] >= $batchDate->start_date && $data['start_date'] <= $batchDate->end_date) {
                return true;
            }
            if ($data['end_date'] >= $batchDate->start_date && $data['end_date'] <= $batchDate->end_date) {
                return true;
            }
        }
        return false;
    }

    private function getBatchStartAndEndDates(): Collection
    {
        return Batch::all(['start_date', 'end_date']);
    }

    public function findBatchByPurchaseDate(string $purchaseDate): Batch
    {
        return Batch::select('name', 'color')
            ->where('start_date', '<=', $purchaseDate)
            ->where('end_date', '>=', $purchaseDate)
            ->first();
    }
}

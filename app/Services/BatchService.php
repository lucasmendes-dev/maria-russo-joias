<?php

namespace App\Services;

use App\Models\Batch;

class BatchService 
{
    public function __construct() {}

    public function checkIfBatchDateConflicts(array $data): bool
    {
        $batchDates = Batch::getBatchStartAndEndDates();
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
}

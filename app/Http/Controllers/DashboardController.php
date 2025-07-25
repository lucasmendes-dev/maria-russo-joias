<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct (private DashboardService $dashboardService) {}

    public function index()
    {
        $data = $this->dashboardService->getData();

        $headBoxesData = $data['headBoxesData'];
        $graphData = $data['graphData'];
        $transactions = $data['transactions'];
        //$transactions = Transaction::orderBy('date', 'desc')->get();
        return Inertia::render('dashboard/index', [
            'headBoxesData' => $headBoxesData,
            'graphData' => $graphData,
            'transactions' => $transactions,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Tax;
use Inertia\Inertia;

class SimulationController extends Controller
{
    public function index()
    {
        $taxes = Tax::getAllActivatedTaxes();
        return Inertia::render('simulation/index', ['taxes' => $taxes]);
    }
}

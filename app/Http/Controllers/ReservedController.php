<?php

namespace App\Http\Controllers;

use App\Http\Requests\Reserved\StoreReservedRequest;
use App\Http\Requests\Reserved\UpdateReservedRequest;
use App\Models\Reserved;
use App\Services\ReservedService;

class ReservedController extends Controller
{
    public function __construct(private ReservedService $reservedService) {}

    public function index()
    {
        //
    }

    public function storeReservedProduct(StoreReservedRequest $request)
    {
        $data = $request->validated();

        Reserved::create($data);
        $this->reservedService->setProductAsReserved($data['product_id']);

        return redirect()->back()->with('success', 'Produto "' . $data['name'] . '" reservado!');
    }

    public function update(UpdateReservedRequest $request, Reserved $reserved)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}

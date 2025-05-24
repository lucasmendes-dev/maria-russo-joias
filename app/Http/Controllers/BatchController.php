<?php

namespace App\Http\Controllers;

use App\Http\Requests\Batch\StoreBatchRequest;
use App\Http\Requests\Batch\UpdateBatchRequest;
use App\Models\Batch;
use App\Services\BatchService;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function __construct(private BatchService $batchService) {}

    public function index()
    {
        $batches = $this->batchService->getAllBatchesOrderedByDate();
        return Inertia::render('batches/index', ['batches' => $batches]);
    }

    public function store(StoreBatchRequest $request)
    {
        $data = $request->validated();
        $dateConflict = $this->batchService->checkIfBatchDateConflicts($data);
        if ($dateConflict) {
            return redirect()->back()->with('error', 'O período de data do lote que você tentou cadastrar já existe. Cadastre lotes com datas diferentes.');
        }
        Batch::create($data);  // refactor ?

        return redirect()->back()->with('success', 'Lote "' . $data['name'] . '" cadastrado!');
    }

    public function update(UpdateBatchRequest $request, string $id)
    {
        $batch = $this->batchService->getBatchById($id);
        $batch->update($request->validated());

        return redirect()->back()->with('success', 'Os dados do lote "' . $batch->name . '" foram atualizados!');
    }

    public function destroy(string $id)
    {
        $batch = $this->batchService->getBatchById($id);
        $batchName = $batch->name;

        $batch->delete();

        return redirect()->back()->with('success', 'Lote "' . $batchName . '" deletado com sucesso!');
    }
}

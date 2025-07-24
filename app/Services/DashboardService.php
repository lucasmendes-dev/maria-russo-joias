<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Reserved;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class DashboardService 
{
    public function __construct(private ProductService $productService) {}

    public function getData(): array
    {
        $headBoxesData = $this->getHeadBoxesData();
        $graphData = $this->getGraphData();

        return [
            'headBoxesData' => $headBoxesData,
            'graphData' => $graphData
        ];
    }

    private function getHeadBoxesData(): array
    {
        $totalProfit = $this->getTotalProfit();
        $valueToReceive = Reserved::getReservedProductsSumValue() + $this->productService->getPendingProductsTotalRemainingValue();
        $jewelryInventoryValue = round(Product::getJewelryInventoryValue(), 2);
        $totalJewelrySold = Product::getTotalJewelrySold();

        return [
            'totalProfit' => $totalProfit,
            'valueToReceive' => $valueToReceive,
            'jewelryInventoryValue' => $jewelryInventoryValue,
            'totalJewelrySold' => $totalJewelrySold
        ];
    }

    private function getGraphData(): array
    {
        // all data is divided by month
        $totalProductsSold = Transaction::getTotalProductsSoldByMonth();
        $costsValue = Product::getProductCostsByMonth();  // **somar com 'costs' de transaction
        $revenueValue = Transaction::getRevenueValueByMonth();

        $graphData = $this->mergeGraphData($totalProductsSold, $costsValue, $revenueValue);
        $this->addMonthProfitToGraphData($graphData);
        return $graphData;
    }

    private function getTotalProfit(): float
    {
        $totalRevenue = Transaction::getTotalRevenue();
        $totalCosts = Transaction::getTotalTransactionCosts() + Product::getTotalProductCosts();
        return $totalRevenue - $totalCosts;
    }

    private function mergeGraphData(Collection $totalProductsSold, Collection $costsValue, Collection $revenueValue): array
    {
        $merged = [];

        foreach ($totalProductsSold as $item) {
            $month = $item->month_number;
            $merged[$month]['month_number'] = $month;
            $merged[$month]['totalProductsSold'] = $item->sold_products;
        }

        foreach ($costsValue as $item) {
            $month = $item->month_number;
            $merged[$month]['month_number'] = $month;
            $merged[$month]['costsValue'] = $item->total_price;
        }

        foreach ($revenueValue as $item) {
            $month = $item->month_number;
            $merged[$month]['month_number'] = $month;
            $merged[$month]['revenueValue'] = $item->total_price;
        }

        $graphData = [];
        foreach ($merged as $data) {
            $monthNumber = (int)$data['month_number'];
            $graphData[] = [
                'month' => ucfirst(Carbon::create()->month($monthNumber)->locale('pt_BR')->monthName),
                'totalProductsSold' => $data['totalProductsSold'] ?? 0,
                'costsValue' => $data['costsValue'] ?? 0,
                'revenueValue' => $data['revenueValue'] ?? 0,
            ];
        }

        return $graphData;
    }

    public function addMonthProfitToGraphData(array &$graphData): array
    {
        foreach ($graphData as $key => $data) {
            $graphData[$key]['monthProfit'] = $data['revenueValue'] - $data['costsValue'];
        }
        return $graphData;
    }
}

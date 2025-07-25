import { Headbox } from "@/types";


export function HeadBoxes({headBoxesData} : {headBoxesData: Headbox}) {
    
    function formatNumberToBR(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }
    
    const totalProfit = formatNumberToBR(headBoxesData.totalProfit);
    const valueToReceive = formatNumberToBR(headBoxesData.valueToReceive);
    const jewelryInventoryValue = formatNumberToBR(headBoxesData.jewelryInventoryValue);

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 p-4 flex flex-col items-center justify-center text-center">
                <div className="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    Lucro Total (R$)
                </div>
                <div className="text-4xl font-bold text-green-900 dark:text-green-400">
                    {totalProfit ?? 0}
                </div>
            </div>

            <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 p-4 flex flex-col items-center justify-center text-center">
                <div className="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    Valor a Receber (R$)
                </div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {valueToReceive ?? 0}
                </div>
            </div>

            <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 p-4 flex flex-col items-center justify-center text-center">
                <div className="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    Saldo em Joias (R$)
                </div>
                <div className="text-4xl font-bold text-yellow-600 dark:text-purple-400">
                    {jewelryInventoryValue ?? 0}
                </div>
            </div>

            <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 p-4 flex flex-col items-center justify-center text-center">
                <div className="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    Total de Joias Vendidas
                </div>
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                    {headBoxesData.totalJewelrySold ?? 0}
                </div>
            </div>
        </div>
    );
}

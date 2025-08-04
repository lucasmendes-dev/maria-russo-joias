import AppLayout from '@/layouts/app-layout';
import { Tax, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Simulação de Preço',
        href: route('simulation.index'),
    },
];

export default function Simulation({taxes} : {taxes: Tax[]}) {
    const [price, setPrice] = useState(0);
    const [profit, setProfit] = useState(0);
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    function calculateFinalPrice(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const systemTaxesValues = getSystemtaxesSum();
        const valueFromPercentage = price * (profit / 100);
        let result = 0;
        if (price != 0) {
            result = price + valueFromPercentage + systemTaxesValues + additionalPrice;
        }
        setFinalPrice(result);
    }

    function getSystemtaxesSum() {
        return taxes.reduce((sum, item) => {
            if (item.name === "Lucro"){
                return sum;
            }
            return sum + item.price;
        }, 0);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Simulação de Preço" />
            <div className="flex flex-col gap-4 p-4 mt-7">
                <div className="flex flex-col md:flex-row gap-6 w-full min-h-[70vh]">
                    <form className="flex-1 rounded-2xl border border-border bg-background p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-muted-foreground">Valores à Calcular</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="price" className="mb-1 block">Preço do Item (R$)</Label>
                                <Input type="number" id="price" onChange={(e) => setPrice(Number(e.target.value))} placeholder="Ex: 39,90" />
                            </div>
                
                            <div>
                                <Label htmlFor="profit" className="mb-1 block">Margem de Lucro (%)</Label>
                                <Input type="number" id="profit" onChange={(e) => setProfit(Number(e.target.value))} placeholder="Ex: 50" />
                            </div>

                            {/* Activated system taxes */}
                            {taxes
                                .filter(tax => tax.name !== "Lucro")
                                .map((tax, index) => (
                                    <div key={tax.name}>
                                        <Label htmlFor={`tax-${index}`} className="mb-1 block text-purple-400">
                                            {tax.name} (R$)
                                        </Label>
                                        <Input
                                            id={`tax-${index}`}
                                            type="number"
                                            value={tax.price}
                                            className="cursor-not-allowed text-purple-200"
                                            placeholder={`Digite a % de ${tax.name}`}
                                        />
                                    </div>
                                ))
                            }
                            {/* Activated system taxes */}

                            <div>
                                <Label htmlFor="price" className="mb-1 block">Valor Adicional (R$) - Opcional</Label>
                                <Input type="number" id="price" onChange={(e) => setAdditionalPrice(Number(e.target.value))} placeholder="Ex: 39,90" />
                            </div>

                            <div className="flex justify-end">
                                <Button onClick={calculateFinalPrice} className="cursor-pointer">
                                    Calcular Valor
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="flex-1 flex items-center justify-center rounded-2xl border border-border bg-muted/40 p-6 shadow-sm">
                        <div className="text-center space-y-4">
                            <h2 className="text-xl font-semibold text-muted-foreground">Valor Final</h2>
                            <p className="text-5xl font-bold text-green-600 dark:text-green-400">R$ {finalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );  
}

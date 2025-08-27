import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Debt, UpdateInstallmentFormProps } from "@/types";
import { formatToBRCurrency } from "@/utils/functions-lib";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

export function UpdateInstallmentForm({
    productName,
    soldPrice,
    installments,
    currentInstallment,
    date,
    paidValue,
    remainingValue,
    setProductname,
    setSoldPrice,
    setInstallments,
    setCurrentInstallment,
    setInstallmentValue,
    setDate,
    setPaidValue,
    setRemainingValue,
    debts,
}: UpdateInstallmentFormProps) {

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Produto <span className="text-red-400">*</span></Label>
                    <Input id="name" value={productName} onChange={(e) => setProductname(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" required readOnly/>
                </div>

                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="installments" className="block mb-2">Parcelas <span className="text-red-400">*</span></Label>
                    <Input id="installments" type="number" value={installments} onChange={(e) => setInstallments(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="current_installment" className="block mb-2">Parcela Atual <span className="text-red-400">*</span></Label>
                    <Input id="current_installment" type="number" value={currentInstallment} onChange={(e) => setCurrentInstallment(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required  />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="purchase_date" className="block mb-2">Data do Pagamento da Parcela <span className="text-red-400">*</span></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal cursor-pointer",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date) => {
                                    if (date) {
                                        setDate(date);
                                    }
                                }}
                                initialFocus
                                defaultMonth={date}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input id="price" type="number" onChange={(e) => setInstallmentValue(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: R$60.90" />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="soldPrice" className="block mb-2">Valor Total (R$)</Label>
                    <Input id="soldPrice" value={soldPrice} onChange={(e) => setSoldPrice(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" required readOnly/>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="paidValue" className="block mb-2">Valor Pago (R$)</Label>
                    <Input id="paidValue" value={paidValue} onChange={(e) => setPaidValue(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" required readOnly/>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="remainingValue" className="block mb-2">Valor Restante (R$)</Label>
                    <Input id="remainingValue" value={remainingValue} onChange={(e) => setRemainingValue(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" required readOnly/>
                </div>
            </div>

            
            <div className="w-full px-3 mb-4">
                {debts && debts.length > 0 ? (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Parcelas</h3>
                        <div className="space-y-2">
                            {debts.map((debt: Debt, index: number) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-3 bg-muted"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <p className="text-sm">
                                            <span className="font-medium text-purple-400">nº:</span> {debt.current_installment} de {debt.installments}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium text-purple-400">Valor:</span> R$ {formatToBRCurrency(debt.installment_value)}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium text-purple-400">Data:</span> {new Date(debt.date + 'T00:00:00').toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic">Houve um erro, as parcelas não foram renderizadas</p>
                )}
            </div>
            
        </form>
    );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Debt, SoldFormProps } from "@/types";
import { formatToBRCurrency, parseSingleDate } from "@/utils/functions-lib";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export function SoldForm({
    name,
    soldPrice,
    paymentMethod,
    discountValue,
    date,
    customer,
    setName,
    setSoldPrice,
    setPaymentMethod,
    setDiscountValue,
    setDate,
    setCustomer,
    debts,
}: SoldFormProps) {
    const parsedDate = parseSingleDate(date);

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" readOnly/>
                </div>

                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="customer" className="block mb-2">Cliente <span className="text-red-400">*</span></Label>
                    <Input id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" readOnly/>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="sold_price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input id="sold_price" type="number" value={soldPrice} onChange={(e) => setSoldPrice(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3"/>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="dicount_value" className="block mb-2">Desconto (R$)</Label>
                    <Input id="dicount_value" type="number" value={discountValue} onChange={(e) => setDiscountValue(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3"/>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="purchase_date" className="block mb-2">Data da Venda <span className="text-red-400">*</span></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal cursor-pointer",
                                    !parsedDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {parsedDate ? format(parsedDate, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                                mode="single"
                                selected={parsedDate}
                                onSelect={(date) => {
                                    if (date) {
                                        const formatted = format(date, "yyyy-MM-dd");
                                        setDate(formatted);
                                    }
                                }}
                                initialFocus
                                defaultMonth={parsedDate}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="payment_method" className="block mb-2">Forma de Pagamento <span className="text-red-400">*</span></Label>
                    <Select
                        value={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value)}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder="Escolha uma opção" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="cash">Dinheiro</SelectItem>
                                <SelectItem value="pix">Pix</SelectItem>
                                <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                                            <span className="font-medium text-blue-400">nº:</span> {debt.current_installment} de {debt.installments}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium text-blue-400">Valor:</span> R$ {formatToBRCurrency(debt.installment_value)}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium text-blue-400">Data:</span> {new Date(debt.date + 'T00:00:00').toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic">Este produto não foi parcelado.</p>
                )}
            </div>

        </form>
    );
}

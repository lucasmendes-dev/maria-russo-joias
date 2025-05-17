import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { PendingFormProps } from "@/types";
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
import { parseDateString } from "@/utils/functions-lib";

export function PendingForm({
    name,
    soldPrice,
    quantity,
    paymentMethod,
    customer,
    installments,
    currentInstallment,
    purchaseDate,
    dateToEnd,
    setName,
    setSoldPrice,
    setQuantity,
    setPaymentMethod,
    setCustomer,
    setDiscountValue,
    setInstallments,
    setCurrentInstallment,
    setPurchaseDate,
    setDateToEnd,
    customers,
}: PendingFormProps) {

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required readOnly/>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="customer" className="block mb-2">Cliente <span className="text-red-400">*</span></Label>
                    <Select
                        value={String(customer)}
                        onValueChange={(value) => setCustomer(value)}
                    >
                        <SelectTrigger >
                            <SelectValue className="mb-3" placeholder="Selecione um cliente" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {customers.map((value) => (
                                    <SelectItem key={value.id} value={String(value.id)}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="quantity" className="block mb-2">Quantidade <span className="text-red-400">*</span></Label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="selling_price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input id="selling_price" type="number" value={soldPrice} onChange={(e) => setSoldPrice(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required  />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="purchase_date" className="block mb-2">Data da Venda <span className="text-red-400">*</span></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal cursor-pointer",
                                    !purchaseDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {purchaseDate ? format(purchaseDate, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                                mode="single"
                                selected={purchaseDate}
                                onSelect={(date) => {
                                    if (date) {
                                        setPurchaseDate(date);
                                    }
                                }}
                                initialFocus
                                defaultMonth={purchaseDate}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="installments" className="block mb-2">Parcelas <span className="text-red-400">*</span></Label>
                    <Input id="installments" type="number" value={installments} onChange={(e) => setInstallments(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="current_installment" className="block mb-2">Parcela Atual <span className="text-red-400">*</span></Label>
                    <Input id="current_installment" type="number" value={currentInstallment} onChange={(e) => setCurrentInstallment(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required  />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="purchase_date" className="block mb-2">Previsão de Término <span className="text-red-400">*</span></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal cursor-pointer",
                                    !dateToEnd && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateToEnd ? format(dateToEnd, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                                mode="single"
                                selected={dateToEnd}
                                onSelect={(date) => {
                                    if (date) {
                                        setDateToEnd(date);
                                    }
                                }}
                                initialFocus
                                defaultMonth={dateToEnd}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">

                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
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

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="discount" className="block mb-2">Valor Pago</Label>
                    <Input id="discount"  className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required/>
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="discount" className="block mb-2">Valor Restante</Label>
                    <Input id="discount"  className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required/>
                </div>
            </div>
        </form>
    );
}

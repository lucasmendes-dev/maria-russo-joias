import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { PendingFormProps } from "@/types";
import { parseSingleDate } from "@/utils/functions-lib";
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

export function PendingForm({
    name,
    soldPrice,
    quantity,
    paymentMethod,
    customer,
    soldDate,
    dateToEnd,
    setName,
    setSoldPrice,
    setQuantity,
    setPaymentMethod,
    setCustomer,
    setSoldDate,
    setDateToEnd,
    customers,
}: PendingFormProps) {

    const parsedDate = parseSingleDate(soldDate);

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" required readOnly/>
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
                                        setSoldDate(formatted);
                                    }
                                }}
                                initialFocus
                                defaultMonth={parsedDate}
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
        </form>
    );
}

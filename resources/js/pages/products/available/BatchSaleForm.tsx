import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { BatchSaleFormProps, Product } from "@/types";
import { formatToBRCurrency } from "@/utils/functions-lib";
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

export function BatchSaleForm({
    products,
    customers,
}: BatchSaleFormProps) {
    const date = new Date();

    return (
        <form className="w-full max-w-lg">
            <div className="space-y-2 mb-4">
                {products && products.map((product: Product, index: number) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 bg-muted"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <p className="text-sm">
                                <span className="font-medium text-purple-400">Produto:</span> {product.name}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium text-purple-400">Preço:</span> {formatToBRCurrency(product.selling_price)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="customer" className="block mb-2">Cliente <span className="text-red-400">*</span></Label>
                    <Select
                        // onValueChange={(value) => setCustomer(value)}
                    >
                        <SelectTrigger >
                            <SelectValue className="mb-3" placeholder="Selecione um cliente" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {customers?.map((customer) => (
                                    <SelectItem key={customer.id} value={String(customer.id)}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input id="price" type="number" className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: R$60.90" />
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
                                        // setDate(date);
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
                    <Label htmlFor="payment_method" className="block mb-2">Forma de Pagamento <span className="text-red-400">*</span></Label>
                    <Select
                        // onValueChange={(value) => setPaymentMethod(value)}
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
        </form>

    )
}

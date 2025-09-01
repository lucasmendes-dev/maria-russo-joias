import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { BatchSaleFormProps, Product } from "@/types";
import { formatToBRCurrency, parseSingleDate } from "@/utils/functions-lib";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
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
    batchPrice,
    date,
    setDate,
    setBatchPrice,
    setCustomer,
    setInstallmentValue,
    setPaymentMethod,
}: BatchSaleFormProps) {
    const parsedDate = parseSingleDate(date);
    const [installment, setInstallment] = useState('no');

    useEffect(() => {
        const price = products?.reduce((acc, product) => acc + product.selling_price, 0);
        setBatchPrice(Number(price));
    }, [products]);

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
                        onValueChange={(value) => setCustomer(value)}
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
                    <Input 
                        id="price"
                        type="number"
                        value={batchPrice}
                        onChange={(e) => setBatchPrice(Number(e.target.value))}
                        className="appearance-none block w-full rounded-lg py-3 px-4 mb-3"
                        placeholder="Ex: R$60" 
                        required 
                    />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="selling_date" className="block mb-2">Data da Venda <span className="text-red-400">*</span></Label>
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

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="installment">Será Parcelado?</Label>
                    <RadioGroup
                        defaultValue="no"
                        onValueChange={(value) => setInstallment(value)}
                    >
                        <div className="flex mb-2 border rounded-lg">
                            <div className="flex items-center space-x-2 mt-2 mb-2 ml-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes">Sim</Label>
                            </div>
                            <div className="flex items-center space-x-2 mt-2 mb-2 ml-3">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no">Não</Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
                {installment === "yes" && (
                    <div className="w-full md:w-1/2 px-3">
                        <Label htmlFor="installment_value">Parcelas:</Label>
                        <Select
                            onValueChange={(value) => setInstallmentValue(Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="x0" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">x1</SelectItem>
                                    <SelectItem value="2">x2</SelectItem>
                                    <SelectItem value="3">x3</SelectItem>
                                    <SelectItem value="4">x4</SelectItem>
                                    <SelectItem value="5">x5</SelectItem>
                                    <SelectItem value="6">x6</SelectItem>
                                    <SelectItem value="7">x7</SelectItem>
                                    <SelectItem value="8">x8</SelectItem>
                                    <SelectItem value="9">x9</SelectItem>
                                    <SelectItem value="10">x10</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
        </form>

    )
}

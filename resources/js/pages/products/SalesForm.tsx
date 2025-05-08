import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { SalesFormProps } from "@/types";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

export function SalesForm({
    name,
    sellingPrice,
    quantity,
    paymentMethod,
    setName,
    setSellingPrice,
    setQuantity,
    setPaymentMethod,
    setDiscountValue,
    setInstallmentValue,
    customers,
    setCustomer,
}: SalesFormProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [registeredClient, setRegisteredClient] = useState('yes');
    const [discount, setDiscount] = useState('no');
    const [installment, setInstallment] = useState('no');

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required readOnly/>
                </div>

                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="quantity" className="block mb-2">Quantidade <span className="text-red-400">*</span></Label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="selling_price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input id="selling_price" type="number" value={sellingPrice.toFixed(2)} onChange={(e) => setSellingPrice(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required  />
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

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="discount">Cliente já Cadastrado?</Label>
                    <RadioGroup
                        defaultValue="yes"
                        onValueChange={(value) => setRegisteredClient(value)}
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

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                {registeredClient === "yes" ? (
                    <>
                        <Label htmlFor="customer" className="block mb-2">Cliente <span className="text-red-400">*</span></Label>
                        <Select
                            onValueChange={(value) => setCustomer(value)}
                        >
                            <SelectTrigger >
                                <SelectValue className="mb-3" placeholder="Selecione um cliente" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={String(customer.id)}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </>
                ) : (
                    <>
                        <Label htmlFor="customerName" className="block mb-2">Nome do Cliente <span className="text-red-400">*</span></Label>
                        <Input id="customerName" type="text" className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: Maria"/>
                    </>
                )}
                </div>
            </div>

            {registeredClient === "no" && (
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3">
                        <Label htmlFor="customerPhone" className="block mb-2">Telefone <span className="text-red-400">*</span></Label>
                        <Input id="customerPhone" type="text" className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" placeholder="(XX) XXXX-XXXX"/>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <Label htmlFor="customerLocal" className="block mb-2">Local <span className="text-red-400">*</span></Label>
                        <Input id="customerLocal" type="text" className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: Ouro Preto"/>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="discount">Haverá Desconto?</Label>
                    <RadioGroup
                        defaultValue="no"
                        onValueChange={(value) => setDiscount(value)}
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
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                {discount === "yes" && (
                    <div className="w-full md:w-1/2 px-3 flex">
                        <Label htmlFor="discount" className="block mt-3">Desconto(R$) </Label>
                        <Input id="discount" type="number" onChange={(e) => setDiscountValue(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 ml-3"/>
                    </div>
                )}

                {installment === "yes" && (
                    <div className="w-full md:w-1/3 px-3 flex">
                        <Label htmlFor="discount" className="block mt-3">Parcelas:</Label>
                        <Select
                        onValueChange={(value) => setInstallmentValue(value)}
                    >
                        <SelectTrigger className="ml-3">
                            <SelectValue placeholder="" />
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
    );
}

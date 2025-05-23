import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { PageProps, SalesFormProps } from "@/types";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePage } from "@inertiajs/react";
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
    mockPrice,
    quantity,
    paymentMethod,
    discountValue,
    installmentValue,
    date,
    firstInstallmentValue,
    firstInstallmentDate,
    setName,
    setSellingPrice,
    setQuantity,
    setPaymentMethod,
    setDiscountValue,
    setInstallmentValue,
    setDate,
    customers,
    setCustomer,
    setFirstInstallmentDate,
    setFirstInstallmentValue,
}: SalesFormProps) {
    const [discount, setDiscount] = useState('no');
    const [installment, setInstallment] = useState('no');
    const [isAdjustedByFee, setIsAdjustedByFee] = useState(false);
    const MACHINE_FEE_VALUES = usePage<PageProps>().props.MACHINE_FEE_VALUES;

    useEffect(() => {
        if (paymentMethod === 'credit_card' && Number(installmentValue) > 1) {
            const feePercent: number = MACHINE_FEE_VALUES[installmentValue] / 100;
            const adjusted = mockPrice + (mockPrice * feePercent);
            setSellingPrice(Number(adjusted.toFixed(2)));
            setIsAdjustedByFee(true);
        } else {
            setSellingPrice(mockPrice);
            setIsAdjustedByFee(false);
        }
        
        if (discountValue && discountValue > 0) {
            const adjustedSellingValue = sellingPrice - discountValue;
            setSellingPrice(Number(adjustedSellingValue.toFixed(2)));
            setIsAdjustedByFee(true);
        }
    }, [paymentMethod, installmentValue, mockPrice, setSellingPrice, discountValue, MACHINE_FEE_VALUES]);

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3 cursor-not-allowed" required readOnly/>
                </div>

                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="quantity" className="block mb-2">Quantidade <span className="text-red-400">*</span></Label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="selling_price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input
                        id="selling_price"
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(Number(e.target.value))} 
                        className={`appearance-none block w-full rounded-lg py-3 px-4 mb-3 ${
                            isAdjustedByFee ? 'border-red-400' : ''
                        }`}
                        required  
                    />
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
                </div>
            </div>

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
                        <Input id="discount" type="number" onChange={(e) => setDiscountValue(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 ml-3"/>
                    </div>
                )}

                {installment === "yes" && (
                    <div className="w-full md:w-1/3 px-3 flex">
                        <Label htmlFor="installment_value" className="block mt-3">Parcelas:</Label>
                        <Select
                            onValueChange={(value) => setInstallmentValue(Number(value))}
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

            {installment === "yes" && (
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3">
                        <Label htmlFor="first_installment_date" className="block mb-2">Data da Primeira Parcela</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal cursor-pointer",
                                        !firstInstallmentDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {firstInstallmentDate ? format(firstInstallmentDate, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0 pointer-events-auto">
                                <Calendar
                                    mode="single"
                                    selected={firstInstallmentDate}
                                    onSelect={(date) => {
                                        if (date) {
                                            setFirstInstallmentDate(date);
                                        }
                                    }}
                                    initialFocus
                                    defaultMonth={firstInstallmentDate}
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <Label htmlFor="first_installment_value" className="block mb-2">Preço da Primeira Parcela (R$)</Label>
                        <Input id="first_installment_value" type="number" value={Number(firstInstallmentValue)} onChange={(e) => setFirstInstallmentValue(Number(e.target.value))} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required  />
                    </div>
                </div>
            )}
        </form>
    );
}

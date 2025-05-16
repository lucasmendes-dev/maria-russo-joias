import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ReservedFormProps } from "@/types";
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

export function ReservedForm({
    name,
    price,
    description,
    reserved_date,
    setName,
    setPrice,
    setDescription,
    setReserveDate,
    customers,
    setCustomer
}: ReservedFormProps) {
    const parsedDate = reserved_date
        ? (() => {
            const [year, month, day] = reserved_date.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day));
        })()
        : undefined;

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded py-3 px-4 mb-3" required placeholder="Ex: Maria" />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="appearance-none block w-full rounded py-3 px-4 mb-3" required placeholder="Ex: R$60.90" />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">

                <div className="w-full md:w-1/2 px-3">
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

                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="purchase_date" className="block mb-2">Data de Reserva <span className="text-red-400">*</span></Label>
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
                                        setReserveDate(formatted);
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
                <div className="w-full md:w-full px-3 mb-4 md:mb-0">
                    <Label htmlFor="description" className="block mb-2">Descrição</Label>
                    <Textarea
                        className="col-span-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>


        </form>
    );
}

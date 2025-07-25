import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { parseSingleDate } from "@/utils/functions-lib";
import { DashboardFormProps } from "@/types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

export function DashboardForm({
    date,
    setType,
    setDescription,
    setPrice,
    setDate,
}: DashboardFormProps) {
    const parsedDate = parseSingleDate(date);
    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="type" className="block mb-2">Tipo <span className="text-red-400">*</span></Label>
                    <Select
                        onValueChange={(value) => setType(value)}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder="Escolha uma opção" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="revenue">Receita</SelectItem>
                                <SelectItem value="cost">Custo</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Data <span className="text-red-400">*</span></Label>
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
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="item" className="block mb-2">Item <span className="text-red-400">*</span></Label>
                    <Input id="item" onChange={(e) => setDescription(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: Sacolinhas" />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Preço (R$)<span className="text-red-400">*</span></Label>
                    <Input type="number" onChange={(e) => setPrice(e.target.value)} id="price" className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required />
                </div>
            </div>
        </form>
    );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BatchFormProps } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { parseSingleDate } from "@/utils/functions-lib";
import { colors } from "@/utils/colors";
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

export function BatchForm({
    name,
    color,
    startDate,
    endDate,
    setName,
    setColor,
    setStartDate,
    setEndDate,
}: BatchFormProps) {
    const parsedStartDate = parseSingleDate(startDate);
    const parsedEndtDate = parseSingleDate(endDate);

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required/>
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="color" className="block mb-2">Cor <span className="text-red-400">*</span></Label>
                    <Select value={color} onValueChange={setColor}>
                        <SelectTrigger>
                            <SelectValue placeholder="Escolha uma cor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {colors.map((color) => (
                                    <SelectItem key={color.hex} value={color.hex}>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-4 h-4 rounded-full border"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <span>{color.name}</span>
                                    </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="start_date" className="block mb-2">Data Inicial <span className="text-red-400">*</span></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal cursor-pointer",
                                    !parsedStartDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {parsedStartDate ? format(parsedStartDate, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                                mode="single"
                                selected={parsedStartDate}
                                onSelect={(date) => {
                                    if (date) {
                                        const formatted = format(date, "yyyy-MM-dd");
                                        setStartDate(formatted);
                                    }
                                }}
                                initialFocus
                                defaultMonth={parsedStartDate}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="end_date" className="block mb-2">Data Final <span className="text-red-400">*</span></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal cursor-pointer",
                                    !parsedEndtDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {parsedEndtDate ? format(parsedEndtDate, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                                mode="single"
                                selected={parsedEndtDate}
                                onSelect={(date) => {
                                    if (date) {
                                        const formatted = format(date, "yyyy-MM-dd");
                                        setEndDate(formatted);
                                    }
                                }}
                                initialFocus
                                defaultMonth={parsedEndtDate}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </form>
    );
}

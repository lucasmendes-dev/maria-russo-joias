"use client"

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { parseDateString } from "@/utils/functions-lib";
import { DateRangePickerProps } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}: DateRangePickerProps) {
    const initialStartDate = parseDateString(startDate);
    const initialEndDate = parseDateString(endDate);

    const [date, setDate] = React.useState<DateRange | undefined> (
        initialStartDate && initialEndDate
          ? { from: initialStartDate, to: initialEndDate }
          : undefined
    );

    React.useEffect(() => {
        if (date) {
            setStartDate(date.from ? format(date.from, 'yyyy-MM-dd') : '');
            setEndDate(date.to ? format(date.to, 'yyyy-MM-dd') : '');
        } else {
            setStartDate('');
            setEndDate('');
        }
    }, [date, setStartDate, setEndDate]);

    return (
        <div className={cn("grid gap-2")}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {
                            date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "PP", {locale: ptBR})} -{" "}
                                {format(date.to, "PP", {locale: ptBR})}
                                </>
                            ) : (
                                    format(date.from, "PP", {locale: ptBR})
                                )
                            ) : (
                            <span>Escolha um período</span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

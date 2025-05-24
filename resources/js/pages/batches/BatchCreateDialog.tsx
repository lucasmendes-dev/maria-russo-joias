import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BatchForm } from "./BatchForm";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

export function BatchCreateDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleCreate = () => {
        if (!name || !color || !startDate || !endDate) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/batches", {
            name,
            color,
            start_date: startDate,
            end_date: endDate,
        }, {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Cadastrar Lote</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar novo lote</DialogTitle>
                </DialogHeader>

                <BatchForm
                    name={name}
                    color={color}
                    startDate={startDate}
                    endDate={endDate}
                    setName={setName}
                    setColor={setColor}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />

                <DialogFooter>
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Lote</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

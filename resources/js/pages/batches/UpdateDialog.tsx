import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { BatchForm } from "./BatchForm";
import { UpdateBatchDialogProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export function UpdateDialog({
    batch,
    open,
    setOpen
}: UpdateBatchDialogProps) {
    const [name, setName] = useState(batch.name);
    const [color, setColor] = useState(batch.color);
    const [startDate, setStartDate] = useState(batch.start_date);
    const [endDate, setEndDate] = useState(batch.end_date);

    const handleUpdate = () => {
        router.put(`/batches/${batch.id}`, {
            name,
            color,
            start_date: startDate,
            end_date: endDate,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setOpen(false);
            }
        });
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 bg-blue-400 cursor-pointer">
                    <Pencil />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar lote: <span className="text-blue-400">{ batch.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

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
                    <Button type="submit" className="cursor-pointer bg-blue-400" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

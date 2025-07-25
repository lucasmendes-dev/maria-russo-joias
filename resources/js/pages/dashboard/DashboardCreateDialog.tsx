import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardForm } from "./DashboardForm";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

export function DashboardCreateDialog() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");

    const handleCreate = () => {
        if (!type || !description || !price || !date) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/transactions", {
            type,
            description,
            price,
            date,
        }, {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Cadastrar Movimentação</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar nova Movimentação</DialogTitle>
                </DialogHeader>

                <DialogDescription className="text-red-400" >Este formulário é destinado exclusivamente a movimentações não relacionadas à aquisição direta de joias.</DialogDescription>

                <DashboardForm
                    date={date}
                    setType={setType}
                    setDescription={setDescription}
                    setPrice={setPrice}
                    setDate={setDate}
                />

                <DialogFooter>
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Movimentação</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DetailForm } from "./DetailForm";
import { router } from "@inertiajs/react";

export function DetailCreateDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = () => {
        if (!name) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/details", {
            name,
            description,
        }, {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Cadastrar Detalhe</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar nova Detalhe</DialogTitle>
                </DialogHeader>

                <DetailForm
                    name={name}
                    description={description}
                    setName={setName}
                    setDescription={setDescription}
                />

                <DialogFooter>
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Detalhe</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

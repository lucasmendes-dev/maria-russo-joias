import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "./CategoryForm";
import { router } from "@inertiajs/react";

export function CategoryCreateDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [local, setLocal] = useState("");

    const handleCreate = () => {
        if (!name || !phone || !local) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/categories", {
            name,
            phone,
            local,
        }, {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Cadastrar Categoria</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar nova Categoria</DialogTitle>
                </DialogHeader>

                <CategoryForm
                    name={name}
                    phone={phone}
                    local={local}
                    setName={setName}
                    setPhone={setPhone}
                    setLocal={setLocal}
                />

                <DialogFooter>
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Categoria</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

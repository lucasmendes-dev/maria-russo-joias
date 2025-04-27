import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "./CategoryForm";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

export function CategoryCreateDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = () => {
        if (!name) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/categories", {
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
                <Button className="cursor-pointer">Cadastrar Categoria</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar nova Categoria</DialogTitle>
                </DialogHeader>

                <CategoryForm
                    name={name}
                    description={description}
                    setName={setName}
                    setDescription={setDescription}
                />

                <DialogFooter>
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Categoria</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

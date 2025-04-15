import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription} from "@/components/ui/dialog";
import { CategoryForm } from "./CategoryForm";

interface UpdateDialogProps {
    category: {
        id: string;
        name: string;
        phone: string;
        local: string;
    };
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function UpdateDialog({ category, open, setOpen }: UpdateDialogProps) {
    const [name, setName] = useState(category.name);
    const [phone, setPhone] = useState(category.phone);
    const [local, setLocal] = useState(category.local);

    const handleUpdate = () => {
        router.put(`/categories/${category.id}`, {
            name,
            phone,
            local
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
                    <DialogTitle>Editar cliente: <span className="text-blue-400">{ category.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

                <CategoryForm
                    name={name}
                    phone={phone}
                    local={local}
                    setName={setName}
                    setPhone={setPhone}
                    setLocal={setLocal}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

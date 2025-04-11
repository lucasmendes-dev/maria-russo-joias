import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { CustomerForm } from "./CustomerForm";

interface UpdateDialogProps {
    customer: {
        id: string;
        name: string;
        phone: string;
        local: string;
    };
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function UpdateDialog({ customer, open, setOpen }: UpdateDialogProps) {
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    const [local, setLocal] = useState(customer.local);

    const handleUpdate = () => {
        router.put(`/customers/${customer.id}`, {
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
                    <DialogTitle>Editar cliente: <span className="text-blue-400">{ customer.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

                <CustomerForm
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface UpdateDialogProps {
    customer: {
        id: string;
        name: string;
        phone: string;
        local: string;
    };
    formatPhoneNumber: (phone: string) => string;
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function UpdateDialog({ customer, formatPhoneNumber, open, setOpen }: UpdateDialogProps) {
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

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">Telefone</Label>
                        <Input id="phone" value={formatPhoneNumber(phone)} onChange={(e) => setPhone(e.target.value)} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="local" className="text-right">Local</Label>
                        <Input id="local" value={local} onChange={(e) => setLocal(e.target.value)} className="col-span-3" />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

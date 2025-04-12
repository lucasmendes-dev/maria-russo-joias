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
import { SupplierForm } from "./SupplierForm";

interface UpdateDialogProps {
    supplier: {
        id: string;
        name: string;
        phone: string;
        social_media: string;
        local: string;
        saller_name: string;
    };
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function UpdateDialog({ supplier, open, setOpen }: UpdateDialogProps) {
    const [name, setName] = useState(supplier.name);
    const [phone, setPhone] = useState(supplier.phone);
    const [socialMedia, setSocialMedia] = useState(supplier.social_media);
    const [local, setLocal] = useState(supplier.local);
    const [sallerName, setSallerName] = useState(supplier.saller_name);

    const handleUpdate = () => {
        router.put(`/suppliers/${supplier.id}`, {
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
                    <DialogTitle>Editar fornecedor: <span className="text-blue-400">{ supplier.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

                <SupplierForm
                    name={name}
                    phone={phone}
                    socialMedia={socialMedia}
                    local={local}
                    sallerName={sallerName}
                    setName={setName}
                    setPhone={setPhone}
                    setSocialMedia={setSocialMedia}
                    setLocal={setLocal}
                    setSallerName={setSallerName}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SupplierForm } from "./SupplierForm";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

export function SupplierCreateDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [socialMedia, setSocialMedia] = useState("");
    const [local, setLocal] = useState("");
    const [sallerName, setsallerName] = useState("");

    const handleCreate = () => {

        if (!name || !phone || !local) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/suppliers", {
            name,
            phone,
            social_media: socialMedia,
            local,
            saller_name: sallerName,
        }, {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Cadastrar Fornecedor</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar novo fornecedor</DialogTitle>
                </DialogHeader>

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
                    setSallerName={setsallerName}
                />

                <DialogFooter>
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Fornecedor</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { CustomerForm } from "./CustomerForm";
import { router } from "@inertiajs/react";

export function SupplierCreateDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [local, setLocal] = useState("");

    const handleCreate = () => {
        if (!name || !phone || !local) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/customers", {
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
                <Button className="cursor-pointer">Cadastrar Fornecedor</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar novo fornecedor</DialogTitle>
                </DialogHeader>

                {/* <CustomerForm
                    name={name}
                    phone={phone}
                    local={local}
                    setName={setName}
                    setPhone={setPhone}
                    setLocal={setLocal}
                /> */}

                <DialogFooter>
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Cliente</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

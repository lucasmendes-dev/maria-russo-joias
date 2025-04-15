import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription} from "@/components/ui/dialog";
import { DetailForm } from "./DetailForm";

interface UpdateDialogProps {
    detail: {
        id: string;
        name: string;
        description: string;
    };
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function UpdateDialog({ detail, open, setOpen }: UpdateDialogProps) {
    const [name, setName] = useState(detail.name);
    const [description, setDescription] = useState(detail.description);

    const handleUpdate = () => {
        router.put(`/details/${detail.id}`, {
            name,
            description,
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
                    <DialogTitle>Editar cliente: <span className="text-blue-400">{ detail.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

                <DetailForm
                    name={name}
                    description={description}
                    setName={setName}
                    setDescription={setDescription}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

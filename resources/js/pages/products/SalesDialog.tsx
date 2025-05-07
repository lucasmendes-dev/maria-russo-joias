import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SalesDialogProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";


export function SalesDialog({ product, salesOpen, setSalesOpen }: SalesDialogProps) {
    const [name, setName] = useState(product.name);

    const handleUpdate = () => {
        router.put(`/products/${product.id}`, {
            name,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSalesOpen(false);
            }
        });
    }
    return (
        <Dialog open={salesOpen} onOpenChange={setSalesOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 bg-green-400 ml-2 cursor-pointer">
                    <ShoppingBag />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Vender produto: <span className="text-green-400">{ product.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Preencha os dados de venda do produto.</DialogDescription>



                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

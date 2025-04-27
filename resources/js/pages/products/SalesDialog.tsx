import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { ProductForm } from "./ProductForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

interface SalesDialogProps {
    product: {
        id: string,
        name: string,
        quantity: string,
        price: string,
        category_id: string,
        description: string,
        color: string,
        purchase_date: string,
        supplier_id: string,
        image: string,
        status: string;
    };
    salesOpen: boolean;
    setSalesOpen: (value: boolean) => void;
}

export function SalesDialog({ product, salesOpen, setSalesOpen }: SalesDialogProps) {
    const [name, setName] = useState(product.name);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    const [category_id, setCategoryId] = useState(product.category_id);
    const [description, setDescription] = useState(product.description);
    const [color, setColor] = useState(product.color);
    const [purchase_date, setPurchaseDate] = useState(product.purchase_date);
    const [supplier_id, setSupplierId] = useState(product.supplier_id);
    const [image, setImage] = useState(product.image);
    const [status, setStatus] = useState(product.status);

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

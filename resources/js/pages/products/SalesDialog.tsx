import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SalesDialogProps } from "@/types";
import { SalesForm } from "./SalesForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export function SalesDialog({
    product,
    customers,
    salesOpen,
    setSalesOpen
}: SalesDialogProps) {
    const [name, setName] = useState(product.name);
    const [sellingPrice, setSellingPrice] = useState(product.selling_price);
    const [quantity, setQuantity] = useState(Number(product.quantity));
    const [paymentMethod, setPaymentMethod] = useState('');
    const [customer, setCustomer] = useState('');

    const handleSale = () => {
        router.post('/saleProduct', { // need to create route, controller & service
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

                <SalesForm
                    name={name}
                    sellingPrice={sellingPrice}
                    quantity={quantity}
                    paymentMethod={paymentMethod}
                    setName={setName}
                    setSellingPrice={setSellingPrice}
                    setQuantity={setQuantity}
                    setPaymentMethod={setPaymentMethod}
                    customers={customers}
                    setCustomer={setCustomer}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-green-400" onClick={handleSale}>Vender Produto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

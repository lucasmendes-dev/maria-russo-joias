import { Button } from "@/components/ui/button";
import { ShoppingBasket } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { ReservedForm } from "./ReservedForm";
import { UpdateReservedDialogProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";


export function ReservedDialog({
    product,
    customers,
    reservedOpen,
    setReservedOpen,
}: UpdateReservedDialogProps) {
    const [productId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [reserved_date, setReserveDate] = useState(product.reserved_date);
    const [description, setDescription] = useState('');
    const [customer, setCustomer] = useState('');

    const handleReserve = () => {
        router.post(`/reserveProduct`, {
            name: name,
            product_id: productId,
            customer_id: customer,
            reserved_value: price,
            reserved_date,
            description,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setReservedOpen(false),
        });
    }

    return (
        <Dialog open={reservedOpen} onOpenChange={setReservedOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 ml-2 bg-orange-400 cursor-pointer">
                    <ShoppingBasket />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reservar produto: <span className="text-orange-400">{ product.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de fazer a reserva.</DialogDescription>

                <ReservedForm 
                    name={name}
                    price={price}
                    reserved_date={reserved_date}
                    description={description}
                    setName={setName}
                    setPrice={setPrice}
                    setReserveDate={setReserveDate}
                    setDescription={setDescription}
                    customers={customers}
                    setCustomer={setCustomer}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-orange-400" onClick={handleReserve}>Reservar Produto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

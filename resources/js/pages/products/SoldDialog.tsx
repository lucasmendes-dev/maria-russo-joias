import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SoldForm } from "./SoldForm";
import { UpdateSoldDialogProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

export function SoldDialog({
    soldProduct,
    open,
    setOpen,
}: UpdateSoldDialogProps) {
    const [productId] = useState(soldProduct.id);
    const [name, setName] = useState(soldProduct.name);
    const [soldPrice, setSoldPrice] = useState(soldProduct.sold_price);
    const [paymentMethod, setPaymentMethod] = useState(soldProduct.payment_method);
    const [customer, setCustomer] = useState(soldProduct.customer);
    const [discountValue, setDiscountValue] = useState(soldProduct.discount ?? 0);
    const [date, setDate] = useState(soldProduct.sold_date);
    const [debts, setDebts] = useState(soldProduct.debts);
console.log(debts)
    const handleUpdate = () => {

        router.put(`/products/${soldProduct.id}`, { // definir ROTA transaction
            productId,
            name,
            soldPrice,
            paymentMethod,
            customer,
            discountValue,
            date,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setOpen(false),
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
                    <DialogTitle>Editar produto vendido: <span className="text-blue-400">{ soldProduct.name }</span></DialogTitle>
                </DialogHeader>

                <SoldForm
                    name={name}
                    soldPrice={soldPrice}
                    paymentMethod={paymentMethod}
                    discountValue={discountValue}
                    date={date}
                    customer={customer}
                    setName={setName}
                    setSoldPrice={setSoldPrice}
                    setPaymentMethod={setPaymentMethod}
                    setDiscountValue={setDiscountValue}
                    setDate={setDate}
                    setCustomer={setCustomer}
                    debts={debts}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-blue-400" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

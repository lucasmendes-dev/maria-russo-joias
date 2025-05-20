import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { PendingDialogProps } from "@/types";
import { PendingForm } from "./pendingForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export function PendingDialog({
    product,
    customers,
    pendingOpen,
    setPendingOpen
}: PendingDialogProps) {
    const [productId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [soldPrice, setSoldPrice] = useState(product.sold_price);
    const [quantity, setQuantity] = useState(Number(product.quantity)); // será deletado
    const [paymentMethod, setPaymentMethod] = useState(product.payment_method);
    const [customer, setCustomer] = useState(product.customer_id);
    const [discountValue, setDiscountValue] = useState(product.discount);
    const [installments, setInstallments] = useState(product.installments);
    const [currentInstallment, setCurrentInstallment] = useState(product.current_installment);
    const [soldDate, setSoldDate] = useState(product.sold_date);
    const [dateToEnd, setDateToEnd] = useState<Date|undefined>(new Date(product.date_to_end));

    const handleUpdate = () => {
        if (!name || !soldPrice || !quantity || !paymentMethod || !customer) {
            alert("Os campos com * são obrigatórios!");
            return;
        }
        router.put(`/updatePendingProduct/${productId}`, { // PAREI AQUI JUNTO COM updatePendingProduct
            product_id: productId,
            sold_price: soldPrice,
            quantity,
            payment_method: paymentMethod,
            customer_id: customer,
            discount: discountValue,
            installments: installments,
            current_installment: currentInstallment,
            sold_date: soldDate,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setPendingOpen(false);
            }
        });
    }
    return (
        <Dialog open={pendingOpen} onOpenChange={setPendingOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 bg-blue-400 ml-2 cursor-pointer">
                    <Pencil />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar produto pendente: <span className="text-blue-400">{ product.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verique os dados do produto.</DialogDescription>

                <PendingForm
                    name={name}
                    soldPrice={soldPrice}
                    quantity={quantity}
                    paymentMethod={paymentMethod}
                    customer={customer}
                    discountValue={discountValue}
                    soldDate={soldDate}
                    dateToEnd={dateToEnd}
                    setName={setName}
                    setSoldPrice={setSoldPrice}
                    setQuantity={setQuantity}
                    setPaymentMethod={setPaymentMethod}
                    setCustomer={setCustomer}
                    setDiscountValue={setDiscountValue}
                    setSoldDate={setSoldDate}
                    setDateToEnd={setDateToEnd}
                    customers={customers}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-blue-400" onClick={handleUpdate}>Atualizar Produto Pendente</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

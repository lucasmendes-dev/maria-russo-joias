import { Button } from "@/components/ui/button";
import { BanknoteIcon } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { PendingDialogProps } from "@/types";
import { UpdateInstallmentForm } from "./UpdateInstallmentForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";


export function UpdateInstallmentDialog({
    product,
    pendingOpen,
    setPendingOpen
}: PendingDialogProps) {
    const [productId] = useState(product.id);
    const [productName, setProductname] = useState(product.name);
    const [soldPrice, setSoldPrice] = useState(product.sold_price);
    const [customer, setCustomer] = useState(product.customer_id);
    const [installments, setInstallments] = useState(product.installments);
    const [currentInstallment, setCurrentInstallment] = useState(product.current_installment);
    const [installmentValue, setInstallmentValue] = useState<number|undefined>(undefined);
    const [date, setDate] = useState<Date|undefined>(new Date());
    const [paidValue, setPaidValue] = useState(product.paid_value);
    const [remainingValue, setRemainingValue] = useState(product.remaining_value);

    const handleUpdate = () => {
        if (!productName || !installments || !currentInstallment || !date || !installmentValue) {
            alert("Os campos com * são obrigatórios!");
            return;
        }
        router.put(`/updateInstallment/${productId}`, {
            product_id: productId,
            customer_id: customer,
            installments: installments,
            current_installment: currentInstallment,
            installment_value: installmentValue,
            date,
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
                <Button className="h-8 w-8 bg-purple-400 ml-2 cursor-pointer">
                    <BanknoteIcon />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atualizar Parcela: <span className="text-purple-400">{ product.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verique os dados antes de atualizar a parcela.</DialogDescription>

                <UpdateInstallmentForm
                    productName={productName}
                    soldPrice={soldPrice}
                    installments={installments}
                    currentInstallment={currentInstallment}
                    date={date}
                    paidValue={paidValue}
                    remainingValue={remainingValue}
                    setProductname={setProductname}
                    setSoldPrice={setSoldPrice}
                    setInstallments={setInstallments}
                    setCurrentInstallment={setCurrentInstallment}
                    setInstallmentValue={setInstallmentValue}
                    setDate={setDate}
                    setPaidValue={setPaidValue}
                    setRemainingValue={setRemainingValue}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-purple-400" onClick={handleUpdate}>Atualizar Parcela</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

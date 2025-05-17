import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { PendingDialogProps } from "@/types";
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

export function PendingDialog({
    product,
    pendingOpen,
    setPendingOpen
}: PendingDialogProps) {
    const [productId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [sellingPrice, setSellingPrice] = useState(product.selling_price || product.reserved_value);
    const [quantity, setQuantity] = useState(Number(product.quantity));
    const [paymentMethod, setPaymentMethod] = useState('');
    const [customer, setCustomer] = useState(product.customer || "");
    const [discountValue, setDiscountValue] = useState('');
    const [installmentValue, setInstallmentValue] = useState('');
    const [date, setDate] = useState<Date|undefined>(new Date());
    const [firstInstallmentDate, setFirstInstallmentDate] = useState<Date|undefined>(new Date());
    const [firstInstallmentValue, setFirstInstallmentValue] = useState<number|null>(null);

    const handleUpdate = () => {
        if (!name || !sellingPrice || !quantity || !paymentMethod || !customer) {
            alert("Os campos com * são obrigatórios!");
            return;
        }
        router.post('/revenueTransaction', {
            product_id: productId,
            name,
            price: sellingPrice,
            quantity,
            payment_method: paymentMethod,
            customer_id: customer,
            discount: discountValue,
            installments: installmentValue,
            date,
            firstInstallmentDate,
            firstInstallmentValue,
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

                {/* <PendingForm 
                    criar
                />*/}

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-blue-400" onClick={handleUpdate}>Atualizar Produto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

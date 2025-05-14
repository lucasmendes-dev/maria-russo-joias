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
    DialogDescription
} from "@/components/ui/dialog";

export function SoldDialog({
    soldProduct,
    open,
    setOpen,
}: UpdateSoldDialogProps) {
    const [productId] = useState(soldProduct.id);
    const [name, setName] = useState(soldProduct.name);
    const [sellingPrice, setSellingPrice] = useState(soldProduct.selling_price);
    const [paymentMethod, setPaymentMethod] = useState(soldProduct.payment_method);
    const [customer, setCustomer] = useState(soldProduct.customer);
    const [discountValue, setDiscountValue] = useState(soldProduct.discount);
    const [installmentValue, setInstallmentValue] = useState(soldProduct.installment_value);
    const [date, setDate] = useState<Date|undefined>(soldProduct.sold_date);

    const handleUpdate = () => {

        router.put(`/products/${soldProduct.id}`, { // definir ROTA transaction
            productId,
            name,
            sellingPrice,
            paymentMethod,
            customer,
            discountValue,
            installmentValue,
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
                    <DialogTitle>Editar produto: <span className="text-blue-400">{ soldProduct.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

                {/* VER SOBRE ISSO NUM FUTURO KKKKKK */}
                {/* <SoldForm
                    name={name}
                    sellingPrice={sellingPrice}
                    paymentMethod={paymentMethod}
                    discountValue={discountValue}
                    installmentValue={installmentValue}
                    date={date}
                    setName={setName}
                    setSellingPrice={setSellingPrice}
                    setPaymentMethod={setPaymentMethod}
                    //customer={customer}
                    setCustomer={setCustomer}
                    setDiscountValue={setDiscountValue}
                    setInstallmentValue={setInstallmentValue}
                    setDate={setDate}
                /> */}

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-blue-400" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

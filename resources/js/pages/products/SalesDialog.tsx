import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
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
    const [productId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [sellingPrice, setSellingPrice] = useState(product.selling_price || product.reserved_value);
    const [mockPrice, setMockPrice] = useState(product.selling_price || product.reserved_value);
    const [quantity, setQuantity] = useState(Number(product.quantity));
    const [paymentMethod, setPaymentMethod] = useState('');
    const [customer, setCustomer] = useState(product.customer || "");
    const [discountValue, setDiscountValue] = useState(0);
    const [installmentValue, setInstallmentValue] = useState(0);
    const [date, setDate] = useState<Date|undefined>(new Date());
    const [firstInstallmentDate, setFirstInstallmentDate] = useState<Date|undefined>(new Date());
    const [firstInstallmentValue, setFirstInstallmentValue] = useState<number|null>(null);

    useEffect(() => {
        setSellingPrice(Number(sellingPrice.toFixed(2)));
    });

    const handleSale = () => {
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
                    mockPrice={mockPrice}
                    quantity={quantity}
                    paymentMethod={paymentMethod}
                    discountValue={discountValue}
                    installmentValue={installmentValue}
                    date={date}
                    firstInstallmentDate={firstInstallmentDate}
                    firstInstallmentValue={firstInstallmentValue}
                    setName={setName}
                    setSellingPrice={setSellingPrice}
                    setMockPrice={setMockPrice}
                    setQuantity={setQuantity}
                    setPaymentMethod={setPaymentMethod}
                    customers={customers}
                    setCustomer={setCustomer}
                    setDiscountValue={setDiscountValue}
                    setInstallmentValue={setInstallmentValue}
                    setDate={setDate}
                    setFirstInstallmentDate={setFirstInstallmentDate}
                    setFirstInstallmentValue={setFirstInstallmentValue}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer bg-green-400" onClick={handleSale}>Vender Produto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

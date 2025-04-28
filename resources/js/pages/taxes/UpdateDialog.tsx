import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { TaxForm } from "./TaxForm";
import { UpdateTaxDialogProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export function UpdateDialog({
    tax,
    open,
    setOpen,
    categories,
}: UpdateTaxDialogProps) {
    const [name, setName] = useState(tax.name);
    const [percentage, setPercentage] = useState(tax.percentage);
    const [price, setPrice] = useState(tax.price);
    const [categoryId, setCategoryId] = useState(tax.category_id);
    const [description, setDescription] = useState(tax.description);
    const [startDate, setStartDate] = useState(tax.start_date);
    const [endDate, setEndDate] = useState(tax.end_date);
    const [spreadTax, setSpreadTax] = useState(tax.spread_tax);
    const [taxActivated, setTaxActivated] = useState(tax.tax_activated);

    const handleUpdate = () => {
        router.put(`/taxes/${tax.id}`, {
            name,
            percentage,
            price,
            category_id: categoryId,
            description,
            start_date: startDate,
            end_date: endDate,
            spread_tax: spreadTax,
            tax_activated: taxActivated,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setOpen(false);
            }
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
                    <DialogTitle>Editar taxa: <span className="text-blue-400">{ tax.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

                <TaxForm
                    name={name}
                    percentage={percentage}
                    price={price}
                    category_id={categoryId}
                    description={description}
                    start_date={startDate}
                    end_date={endDate}
                    spread_tax={spreadTax}
                    tax_activated={taxActivated}
                    setName={setName}
                    setPercentage={setPercentage}
                    setPrice={setPrice}
                    setCategoryId={setCategoryId}
                    setDescription={setDescription}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setSpreadTax={setSpreadTax}
                    setTaxActivated={setTaxActivated}
                    categories={categories}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

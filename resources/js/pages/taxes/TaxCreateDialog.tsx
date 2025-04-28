import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaxForm } from "./TaxForm";
import { router } from "@inertiajs/react";
import { Category } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export function TaxCreateDialog({categories}: {categories: Category[]}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [spreadTax, setSpreadTax] = useState(false);
    const [taxActivated, setTaxActivated] = useState(false);

    const handleCreate = () => {
        if (!name || !categoryId) {
            alert("Os campos com * são obrigatórios!");
            return;
        }

        router.post("/taxes", {
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
            onSuccess: () => setOpen(false),
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Cadastrar Taxa</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar nova Taxa</DialogTitle>
                </DialogHeader>

                <DialogDescription>Insira os dados para cadastrar a taxa.</DialogDescription>

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
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Taxa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BatchSaleForm } from "./BatchSaleForm";
import { BatchSaleDialogProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";


export function BatchSaleDialog({
    products,
    customers,
    batchSaleOpen,
    setBatchSaleOpen,
}: BatchSaleDialogProps) {

    const handleReserve = () => {
        router.post(`/reserveProduct`, {
            //name: name,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setBatchSaleOpen(false),
        });
    }

    return (
        <Dialog open={batchSaleOpen} onOpenChange={setBatchSaleOpen}>
            <DialogTrigger asChild>
                <Button className="mr-3 bg-purple-400 cursor-pointer">
                    Venda Conjunta
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Venda Conjunta</DialogTitle>
                </DialogHeader>

                {products?.length != 0 
                    ?
                    <>
                        <BatchSaleForm 
                            products={products}
                            customers={customers}
                        />

                        <DialogFooter>
                            <Button type="submit" className="cursor-pointer bg-purple-400" onClick={handleReserve}>Confirmar Venda</Button>
                        </DialogFooter>
                    </>
                    :
                    <h1 className="text-gray-500">NÃO HÁ PRODUTOS SELECIONADOS</h1>
                }

            </DialogContent>
        </Dialog>
    );
}

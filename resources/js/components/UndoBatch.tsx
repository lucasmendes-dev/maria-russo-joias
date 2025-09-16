"use client";

import { Button } from "@/components/ui/button";
import { Undo2 } from 'lucide-react';
import { router } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Product } from "@/types";

const handleUndoBatch = (ids: Product) => {
    router.put('/undoBatchSale', {
        product_ids: ids,
    }, {
        preserveScroll: true,
    });
}

export function UndoBatch({
    products,
}: {
    products: Product,
}) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild >
                <Button className="h-8 w-8 ml-2 bg-gray-400 cursor-pointer">
                    <Undo2 />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação irá DESFAZER a venda dos produtos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-gray-400 cursor-pointer"
                        onClick={() => handleUndoBatch(products)}
                    >
                        Desfazer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

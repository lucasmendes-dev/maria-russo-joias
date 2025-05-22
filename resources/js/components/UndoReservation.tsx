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

const handleReservation = (id: string) => {
    router.patch(`/cancelReservation/${id}`, {
        preserveScroll: true,
    });
}

export function UndoReservation({productName, productId}: {productName: string, productId: string}) {
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
                        Esta ação irá DESFAZER a reserva do produto: <strong className="text-gray-400">"{productName}</strong>".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-gray-400 cursor-pointer" onClick={() => handleReservation(productId)}>Desfazer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

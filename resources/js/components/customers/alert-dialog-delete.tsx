"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertDialogDeleteProps {
    customer: {
        id: string;
        name: string;
    };
}

const handleDelete = (id: string) => {
    router.delete(`/customers/${id}`, {
        preserveScroll: true,
    });
}

export function AlertDialogDelete({ customer }: AlertDialogDeleteProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild >
                <Button className="h-8 w-8 ml-2 bg-red-400 cursor-pointer">
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o(a) cliente "{customer.name}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-400 cursor-pointer" onClick={() => handleDelete(customer.id)}>Deletar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

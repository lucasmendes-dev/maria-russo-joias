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
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const handleDelete = (id: string, deleteRoute: string) => {
    router.delete(`/${deleteRoute}/${id}`, {
        preserveScroll: true,
    });
}

export function AlertDialogDelete({
    objectName, deleteRoute
}: {
    objectName: any, deleteRoute: string
}) {
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
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o registro <strong className="text-red-400">"{objectName.name}</strong>".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-400 cursor-pointer" onClick={() => handleDelete(objectName.id, deleteRoute)}>Deletar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

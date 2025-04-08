"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

export type Customer = {
    id: string
    name: string
    phone: string
    local: string
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "checkboxes",
        header: () => <div className="text-center"></div>,
        cell: ({ row }) => {
            return (
                <Checkbox />
            );
        },
    },
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "phone",
        header: "Telefone",
    },
    {
        accessorKey: "local",
        header: "Local",
    },
    {
        header: "Ações",
        id: "actions",
        cell: ({ row }) => {
            const customer = row.original
     
            return (
                <div>
                    <Button className="h-8 w-8 bg-blue-400">
                        <Pencil />
                    </Button>

                    <Button className="h-8 w-8 ml-2 bg-red-400">
                        <Trash2 />
                    </Button>
                </div>
            );
        },
    },
];

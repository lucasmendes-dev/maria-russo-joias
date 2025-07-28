"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { UpdateDialog } from "./UpdateDialog";
import { useState } from "react";
import { formatPhoneNumber } from "@/utils/functions-lib";
import { Customer } from "@/types";

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="ml-3 font-medium">{row.getValue("name")}</div>
        }
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Telefone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            return formatPhoneNumber(row.getValue("phone"));
        },
    },
    {
        accessorKey: "local",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Local / Referência
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="ml-3 font-medium">{row.getValue("local")}</div>
        }
    },
    {
        header: "Ações",
        id: "actions",
        cell: ({ row }) => {
            const customer = row.original;
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            return (
                <div>
                    <UpdateDialog
                        customer={customer}
                        open={isDialogOpen}
                        setOpen={setIsDialogOpen}
                    />
                    <AlertDialogDelete objectName={customer} deleteRoute="customers"/>
                </div>
            );
        },
    },
];

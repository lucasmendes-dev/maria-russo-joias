"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogDelete } from "./alert-dialog-delete";
import { UpdateDialog } from "./update-dialog";
import { useState } from "react";

function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (!match) {
        throw new Error("Invalid phone number");
    }
    const [, ddd, prefix, suffix] = match;
    return `(${ddd}) ${prefix}-${suffix}`;
}

export type Customer = {
    id: string
    name: string
    phone: string
    local: string
}

export const columns: ColumnDef<Customer>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Selecionar tudo"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
                    Local
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
                        formatPhoneNumber={formatPhoneNumber}
                        open={isDialogOpen}
                        setOpen={setIsDialogOpen}
                    />
                    <AlertDialogDelete customer={customer} />
                </div>
            );
        },
    },
];

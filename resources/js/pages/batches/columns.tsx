"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { UpdateDialog } from "./UpdateDialog";
import { useState } from "react";
import { Batch } from "@/types";

export const columns: ColumnDef<Batch>[] = [
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
        cell: ({ row }) => {
            return <div className="ml-4 font-medium">{row.getValue("name")}</div>
        }
    },
    {
        accessorKey: "color",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {

            return <div className="ml-4 font-medium flex items-center w-20">
                <span
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: row.getValue('color') }}
                />
                </div>
        },
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data Inicial
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const formattedDate = new Date(row.getValue("start_date") + 'T00:00:00').toLocaleDateString("pt-BR");
            return <div className="ml-4 font-medium">{formattedDate}</div>
        },
    },
    {
        accessorKey: "end_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data Final
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const formattedDate = new Date(row.getValue("end_date") + 'T00:00:00').toLocaleDateString("pt-BR");
            return <div className="ml-4 font-medium">{formattedDate}</div>
        },
    },
    {
        header: "Ações",
        id: "actions",
        cell: ({ row }) => {
            const batch = row.original;
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            return (
                <div>
                    <UpdateDialog
                        batch={batch}
                        open={isDialogOpen}
                        setOpen={setIsDialogOpen}
                    />
                    <AlertDialogDelete objectName={batch} deleteRoute="batches"/>
                </div>
            );
        },
    },
];

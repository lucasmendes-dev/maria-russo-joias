"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Transaction } from "@/types";
import { formatToBRCurrency } from "@/utils/functions-lib";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
                    <ArrowUpDown className="ml-2 h-7 w-7" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const type = row.getValue("type");
        
            return (
                <div className="ml-5 font-medium flex items-center gap-1">
                    {type === "revenue" ? (
                        <ArrowUp className="h-7 w-7 text-green-400" />
                    ) : (
                        <ArrowDown className="h-7 w-7 text-red-400" />
                    )}
                </div>
            );
          }
    },
    {
        accessorKey: "product",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Item
                    <ArrowUpDown className="h-7 w-7" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="ml-3 font-medium">{row.getValue("product")}</div>
        }
    },
    {
        accessorKey: "customer",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cliente
                    <ArrowUpDown className="h-7 w-7" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="ml-3 font-medium">{row.getValue("customer")}</div>
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Preço
                    <ArrowUpDown className="ml-2 h-7 w-7" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = formatToBRCurrency(price);
    
            return <div className="ml-3 font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data
                    <ArrowUpDown className="ml-2 h-7 w-7" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const formattedDate = new Date(row.getValue("date") + 'T00:00:00').toLocaleDateString("pt-BR");
            return <div className="ml-3 font-medium">{formattedDate}</div>
        }
    },

];

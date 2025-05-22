"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { formatToBRCurrency } from "@/utils/functions-lib";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { SoldDialog } from "./SoldDialog";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@radix-ui/react-avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card";

export const getSoldColumns = (): ColumnDef<Product>[] => {
    return [
        {
            accessorKey: "image",
            header: () => {
                return (
                    <span className="ml-4">-</span>
                )
            },
            cell: ({ row }) => (
                <HoverCard>
                    <HoverCardTrigger>
                        <Avatar>
                            <AvatarImage src={`/storage/images/${row.getValue("image")}`} className="w-10 h-10 rounded-full"/>
                        </Avatar>
                    </HoverCardTrigger>

                    <HoverCardContent className="w-90">
                        <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage src={`/storage/images/${row.getValue("image")}`} className="rounded-lg" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            ),
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
            accessorKey: "customer",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Cliente
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div className="ml-4 font-medium">{row.getValue("customer")}</div>
            }
        },
        {
            accessorKey: "sold_price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Preço de Venda
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const sellingPrice = parseFloat(row.getValue("sold_price"));
                const formatted = formatToBRCurrency(sellingPrice);
        
                return <div className="font-medium ml-7">{formatted}</div>
            }
        },        
        {
            accessorKey: "discount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Desconto
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div className="ml-7 font-medium">{row.getValue("discount") || '-'}</div>
            }
        },
        {
            accessorKey: "sold_date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Data de Venda
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const formattedDate = new Date(row.getValue("sold_date") + 'T00:00:00').toLocaleDateString("pt-BR");
                return <div className="ml-7 font-medium">{formattedDate}</div>
            }
        },
        {
            header: "Ações",
            id: "actions",
            cell: ({ row }) => {
                const soldProduct = row.original;
                const [isDialogOpen, setIsDialogOpen] = useState(false);

                return (
                    <div className="flex">
                        <SoldDialog
                            soldProduct={soldProduct}
                            open={isDialogOpen}
                            setOpen={setIsDialogOpen}
                        />

                        <AlertDialogDelete objectName={soldProduct} deleteRoute="products"/>
                    </div>
                );
            },
        },
    ]
}

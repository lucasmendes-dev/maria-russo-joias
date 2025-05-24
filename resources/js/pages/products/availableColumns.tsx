"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { UpdateDialog } from "./UpdateDialog";
import { useState } from "react";
import { SalesDialog } from "./SalesDialog";
import { Product, Category, Supplier, Customer } from "@/types";
import { formatToBRCurrency } from "@/utils/functions-lib";
import { ReservedDialog } from "./ReservedDialog";
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

export const getAvailableColumns = (
    categories: Category[],
    suppliers: Supplier[],
    customers: Customer[],
): ColumnDef<Product>[] => {
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
            accessorKey: "batch",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Lote
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const batch = row.getValue("batch") as {name: string, color: string};
                return <div 
                            className="inline-block px-2 py-1 rounded-full text-white text-sm font-medium"
                            style={{ backgroundColor: batch.color }}>
                            {batch.name}
                        </div>
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
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"));
                const formatted = formatToBRCurrency(price);
        
                return <div className="font-medium">{formatted}</div>
            }
        },
        {
            accessorKey: "selling_price",
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
                const sellingPrice = parseFloat(row.getValue("selling_price"));
                const formatted = formatToBRCurrency(sellingPrice);
        
                return <div className="font-medium text-green-400 ml-7">{formatted}</div>
            }
        },
        {
            header: "Ações",
            id: "actions",
            cell: ({ row }) => {
                const product = row.original;
                const [isDialogOpen, setIsDialogOpen] = useState(false);
                const [salesOpen, setSalesOpen] = useState(false);
                const [reservedOpen, setReservedOpen] = useState(false);
                return (
                    <div className="flex">
                        <UpdateDialog
                            product={product}
                            open={isDialogOpen}
                            setOpen={setIsDialogOpen}
                            categories={categories}
                            suppliers={suppliers}
                        />

                        <AlertDialogDelete objectName={product} deleteRoute="products"/>

                        <SalesDialog 
                            product={product}
                            customers={customers}
                            salesOpen={salesOpen}
                            setSalesOpen={setSalesOpen}
                        />

                        <ReservedDialog 
                            product={product}
                            customers={customers}
                            reservedOpen={reservedOpen}
                            setReservedOpen={setReservedOpen}
                        />
                    </div>
                );
            },
        },
    ]
}

"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogDelete } from "../AlertDialogDelete";
import { UpdateDialog } from "./UpdateDialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SalesDialog } from "./SalesDialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Product, Category, Supplier } from "@/types";
import { formatToBRCurrency } from "@/utils/functions-lib";

export const getAvailableColumns = (
    categories: Category[],
    suppliers: Supplier[],
): ColumnDef<Product>[] => {
    return [
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
            accessorKey: "quantity",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Quantidade
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div className="ml-7 font-medium">{row.getValue("quantity")}</div>
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
        },
        {
            header: "Ações",
            id: "actions",
            cell: ({ row }) => {
                const product = row.original;
                const [isDialogOpen, setIsDialogOpen] = useState(false);
                const [salesOpen, setSalesOpen] = useState(false);
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
                            salesOpen={salesOpen}
                            setSalesOpen={setSalesOpen}
                        />
                    </div>
                );
            },
        },
    ]
}

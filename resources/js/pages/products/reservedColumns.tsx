"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Customer, Product } from "@/types";
import { formatToBRCurrency } from "@/utils/functions-lib";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { ReservedDialog } from "./ReservedDialog";
import { SalesDialog } from "./SalesDialog";
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

export const getReservedColumns = (customers: Customer[]): ColumnDef<Product>[] => {
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
            accessorKey: "reserved_value",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Preço Reservado
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const sellingPrice = parseFloat(row.getValue("reserved_value"));
                const formatted = formatToBRCurrency(sellingPrice);
        
                return <div className="font-medium ml-7">{formatted}</div>
            }
        },        
        {
            accessorKey: "reserved_date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Data da Reserva
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div className="ml-7 font-medium">{row.getValue("reserved_date") || '-'}</div>
            }
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
                        <ReservedDialog
                            product={product}
                            customers={customers}
                            reservedOpen={isDialogOpen}
                            setReservedOpen={setIsDialogOpen}
                        />

                        <AlertDialogDelete objectName={product} deleteRoute="products"/>

                        <SalesDialog
                            product={product}
                            customers={customers}
                            salesOpen={salesOpen}
                            setSalesOpen={setSalesOpen}
                        />
                    </div>
                );
            },
        },
    ]
}

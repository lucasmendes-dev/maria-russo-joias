"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { UpdateDialog } from "./UpdateDialog";
import { useState } from "react";
import { Category, Tax } from "@/types";
import { sendTaxActivatedPatchRequest } from "@/utils/functions-lib";

export const getColumns = (categories: Category[]): ColumnDef<Tax>[] => {
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
                return <div className="ml-4">{row.getValue("name")}</div>
            }
        },
        {
            accessorKey: "percentage",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Porcentagem
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return row.getValue('percentage') ? <div className="ml-4">{row.getValue("percentage")}%</div> : '';
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
                        Valor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return row.getValue('price') ? <div className="ml-4">R$ {row.getValue("price")}</div> : '';
            }
        },
        {
            accessorKey: "tax_activated",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Taxa ativa
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const [taxActivated, setTaxActivated] = useState(row.getValue('tax_activated') === 1);
                const rowId = row.original.id;

                async function handleSwitchChange(checked: boolean) {
                    setTaxActivated(checked);
                    try {
                        sendTaxActivatedPatchRequest(rowId, checked)
                    } catch (error) {
                        console.error('Erro ao atualizar: ', error);
                        setTaxActivated(!checked);
                    }
                }

                return <div className="ml-4">
                    <Switch
                        id={`tax_activated-${rowId}`}
                        checked={taxActivated}
                        onCheckedChange={(checked) => handleSwitchChange(checked)}
                        className="data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-red-400"
                    />
                </div>
            }
        },
        {
            header: "Ações",
            id: "actions",
            cell: ({ row }) => {
                const tax = row.original;
                const [isDialogOpen, setIsDialogOpen] = useState(false);
                return (
                    <div>
                        <UpdateDialog
                            tax={tax}
                            open={isDialogOpen}
                            setOpen={setIsDialogOpen}
                            categories={categories}
                        />
                        <AlertDialogDelete objectName={tax} deleteRoute="taxes"/>
                    </div>
                );
            },
        },
    ];
};

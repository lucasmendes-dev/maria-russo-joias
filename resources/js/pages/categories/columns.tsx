"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { UpdateDialog } from "./UpdateDialog";
import { useState } from "react";
import { Category } from "@/types";

export const columns: ColumnDef<Category>[] = [
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
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Descrição
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        header: "Ações",
        id: "actions",
        cell: ({ row }) => {
            const category = row.original;
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            return (
                <div>
                    {category.name != "Todos" && (
                        <>
                            <UpdateDialog
                                category={category}
                                open={isDialogOpen}
                                setOpen={setIsDialogOpen}
                            />
                            <AlertDialogDelete objectName={category} deleteRoute="categories"/>
                        </>
                    )}
                </div>
            );
        },
    },
];

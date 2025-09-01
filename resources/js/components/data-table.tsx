"use client"

import { useEffect, useState } from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, getSortedRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "@/components/ui/input";
import { usePage } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { BatchSaleDialog } from "@/pages/products/available/BatchSaleDialog";
import { Customer, Product } from "@/types";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    createButton?: React.ReactNode,
    filters: string[];
    onSelectionChange?: (selected: TData[]) => void;
    products?: Product[];
    customers?: Customer[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
    createButton,
    filters,
    onSelectionChange,
    products,
    customers,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");

    const flash = usePage().props.flash as { success?: string; error?: string };

    if (flash.success) {
        toast.success("Aviso:", {
            description: flash.success,
        });
        flash.success = undefined;
    }

    if (flash.error) {
        toast.error("Aviso:", {
            description: flash.error,
        });
        flash.error = undefined;
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        globalFilterFn: (row, columnId, filterValue) => {
            return filters?.some((filterKey) => {
                const cellValue = row.getValue(filterKey);
                return (
                    typeof cellValue === 'string' &&
                    cellValue?.toLowerCase().includes(filterValue.toLowerCase())
                );
            });
        },
        state: {
            sorting,
            rowSelection,
            globalFilter,
        },
    });

    useEffect(() => {
        const selected = table.getSelectedRowModel().rows.map(row => row.original);
        onSelectionChange?.(selected);
      }, [rowSelection, table, onSelectionChange]);

    const [batchSaleOpen, setBatchSaleOpen] = useState(false);

    return (
        <div className="px-4">
            <div className="flex items-center justify-between py-4 ">
                <Input
                    placeholder="Pesquisar..."
                    value={globalFilter}
                    onChange={(event) =>
                        setGlobalFilter(event.target.value)
                    }
                    className="max-w-sm"
                />

                <div>
                    {(createButton && products) && 
                        <BatchSaleDialog
                            products={products}
                            customers={customers}
                            batchSaleOpen={batchSaleOpen}
                            setBatchSaleOpen={setBatchSaleOpen}
                    />}

                    {createButton && createButton}
                </div>
            </div>

            <Toaster richColors/>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>

                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            Nenhum Resultado.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table}/>
        </div>
    );
}

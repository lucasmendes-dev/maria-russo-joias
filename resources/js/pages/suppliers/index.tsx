import AppLayout from '@/layouts/app-layout';
import { Supplier, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { SupplierCreateDialog } from './SupplierCreateDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fornecedores',
        href: route('suppliers.index'),
    },
];

const filters: string[] = [
    'name',
    'phone',
    'social_media',
    'saller_name',
    'local',
];

export default function Suppliers({suppliers}: {suppliers: Supplier[]}) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fornecedores" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={suppliers} createButton={<SupplierCreateDialog />} filters={filters}/>
                </div>
            </div>
        </AppLayout>
    );
}

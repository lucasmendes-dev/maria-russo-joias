import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Customer } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { CustomerCreateDialog } from './CustomerCreateDialog'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: route('customers.index'),
    },
];

const filters: string[] = [
    'name',
    'phone',
    'local',
];

export default function Customers({customers}: {customers: Customer[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={customers} createButton={<CustomerCreateDialog />} filters={filters}/>
                </div>
            </div>
        </AppLayout>
    );
}

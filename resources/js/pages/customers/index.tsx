import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Customer, columns } from '@/components/customers/columns';
import { DataTable } from '@/components/customers/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: route('customers.index'),
    },
];

export default function Customers({customers}: {customers: Customer[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={customers} />
                </div>
            </div>
        </AppLayout>
    );
}

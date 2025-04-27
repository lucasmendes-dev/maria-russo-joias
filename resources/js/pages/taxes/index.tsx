import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Tax } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Taxas',
        href: route('taxes.index'),
    },
];

const filters: string[] = [
    'name',
    'percentage',
    'price',
    'start_date',
];

export default function Taxes({taxes}: {taxes: Tax[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Taxas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={taxes}  filters={filters}/>
                </div>
            </div>
        </AppLayout>
    );
}

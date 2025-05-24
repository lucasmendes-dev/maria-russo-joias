import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Batch } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { BatchCreateDialog } from './BatchCreateDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lotes',
        href: route('batches.index'),
    },
];

const filters: string[] = [
    'name',
    'color',
    'start_date',
    'end_date',
];

export default function Batches({batches}: {batches: Batch[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={batches} createButton={<BatchCreateDialog />} filters={filters}/>
                </div>
            </div>
        </AppLayout>
    );
}

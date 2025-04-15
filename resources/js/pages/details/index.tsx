import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Detail, columns } from '@/components/details/columns';
import { DataTable } from '@/components/data-table';
import { DetailCreateDialog } from '@/components/details/DetailCreateDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Detalhes',
        href: route('details.index'),
    },
];

const filters: string[] = [
    'name',
    'description',
];

export default function Details({details}: {details: Detail[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={details} createButton={<DetailCreateDialog />} filters={filters}/>
                </div>
            </div>
        </AppLayout>
    );
}

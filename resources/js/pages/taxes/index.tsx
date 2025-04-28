import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { getColumns } from './columns';
import { DataTable } from '@/components/data-table';
import { TaxCreateDialog } from './TaxCreateDialog';
import {
    BreadcrumbItem,
    Category,
    Tax
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Taxas',
        href: route('taxes.index'),
    },
];

const filters: string[] = [
    'name',
];

export default function Taxes({
    taxes,
    categories
}: {
    taxes: Tax[],
    categories: Category[]
}) {
    const columns = getColumns(categories);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Taxas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable
                        columns={columns}
                        data={taxes}
                        createButton={<TaxCreateDialog categories={categories} />}
                        filters={filters}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

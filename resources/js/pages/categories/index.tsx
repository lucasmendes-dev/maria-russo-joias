import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Category, columns } from '@/components/categories/columns';
import { DataTable } from '@/components/data-table';
import { CategoryCreateDialog } from '@/components/categories/CategoryCreateDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: route('categories.index'),
    },
];

const filters: string[] = [
    'name',
    'phone',
    'local',
];

export default function Categories({categories}: {categories: Category[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={categories} createButton={<CategoryCreateDialog />} filters={filters}/>
                </div>
            </div>
        </AppLayout>
    );
}

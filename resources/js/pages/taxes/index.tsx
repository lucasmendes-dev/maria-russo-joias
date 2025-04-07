import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Taxas',
        href: route('taxes.index'),
    },
];

export default function Taxes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Taxas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    
                </div>
            </div>
        </AppLayout>
    );
}

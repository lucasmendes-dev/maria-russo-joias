import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { DashboardProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { HeadBoxes } from './HeadBoxes';
import { CashFlowChart } from './CashFlowChart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Página Inicial',
        href: route('dashboard.index'),
    },
];

export default function Dashboard({
    headBoxesData,
    graphData,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Página Inicial" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <HeadBoxes headBoxesData={headBoxesData} />

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[300px] w-full overflow-hidden rounded-xl border">
                    <CashFlowChart graphData={graphData} />
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>

        </AppLayout>
    );
}

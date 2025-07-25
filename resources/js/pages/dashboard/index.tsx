import AppLayout from '@/layouts/app-layout';
import { DashboardProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { HeadBoxes } from './HeadBoxes';
import { CashFlowChart } from './CashFlowChart';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { DashboardCreateDialog } from './DashboardCreateDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Página Inicial',
        href: route('dashboard.index'),
    },
];

const filters: string[] = [
    'product',
    'customer',
    'price',
    'date',
];

export default function Dashboard({
    headBoxesData,
    graphData,
    transactions,
}: DashboardProps) {console.log(transactions)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Página Inicial" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <HeadBoxes headBoxesData={headBoxesData} />

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[300px] w-full overflow-hidden rounded-xl border">
                    <CashFlowChart graphData={graphData} />
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border">
                    <DataTable columns={columns} data={transactions} createButton={<DashboardCreateDialog />} filters={filters}/>
                </div>
            </div>

        </AppLayout>
    );
}

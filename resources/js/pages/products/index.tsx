import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, ProductProps } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import { ProductCreateDialog } from './ProductCreateDialog';
import { getAvailableColumns} from './availableColumns';
import { getPendingColumns } from './pendingColumn';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { getSoldColumns } from './soldColumns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produtos',
        href: route('products.index'),
    },
];

const availableFilters: string[] = [
    'name',
    'quantity',
    'price',
    'category_id',
    'description',
    'color',
    'purchase_date',
    'supplier_id',
    'status',
];

const pendingAndSoldFilters: string[] = [
    'name',
    'customer',
    'sold_price',
    'payment_method',
    'discount',
    'sold_date',
];

export default function Products({
    availableProducts,
    pendingProducts,
    soldProducts,
    categories,
    suppliers,
    customers,
}: ProductProps) {
    const availableColumns = getAvailableColumns(categories, suppliers, customers);
    const soldColumns = getSoldColumns();
    const pendingColumns = getPendingColumns();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produtos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Tabs defaultValue="available" className="mx-auto mt-3 px-3">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="available" className="cursor-pointer hover:bg-[#0A0A0A]">Disponíveis</TabsTrigger>
                            <TabsTrigger value="reserved" className="cursor-pointer hover:bg-[#0A0A0A]">Reservados</TabsTrigger>
                            <TabsTrigger value="pending" className="cursor-pointer hover:bg-[#0A0A0A]">Pendentes</TabsTrigger>
                            <TabsTrigger value="sold" className="cursor-pointer hover:bg-[#0A0A0A]">Vendidos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="available">
                            <DataTable
                                columns={availableColumns}
                                data={availableProducts}
                                createButton={<ProductCreateDialog categories={categories} suppliers={suppliers}/>}
                                filters={availableFilters}
                            />
                        </TabsContent>

                        <TabsContent value="reserved">
                            <DataTable
                                columns={availableColumns}
                                data={[]}
                                filters={availableFilters}
                            />
                        </TabsContent>

                        <TabsContent value="pending">
                            <DataTable
                                columns={pendingColumns}
                                data={pendingProducts}
                                filters={pendingAndSoldFilters}
                            />
                        </TabsContent>

                        <TabsContent value="sold">
                            <DataTable
                                columns={soldColumns}
                                data={soldProducts}
                                filters={pendingAndSoldFilters}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}

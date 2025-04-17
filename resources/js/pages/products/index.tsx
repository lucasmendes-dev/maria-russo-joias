import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from '@/components/data-table';
import { ProductCreateDialog } from '@/components/products/ProductCreateDialog';
import { Product, availableColumns } from '@/components/products/availableColumns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produtos',
        href: route('products.index'),
    },
];

type ProductProps = {
    availableProducts: Product[];
    pendingProducts: Product[];
    soldProducts: Product[];
}

const filters: string[] = [
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


export default function Products({ availableProducts, pendingProducts, soldProducts }: ProductProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produtos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Tabs defaultValue="available" className="mx-auto mt-3 px-3">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="available" className="cursor-pointer hover:bg-[#0A0A0A]">Disponíveis</TabsTrigger>
                            <TabsTrigger value="pending" className="cursor-pointer hover:bg-[#0A0A0A]">Pendentes</TabsTrigger>
                            <TabsTrigger value="sold" className="cursor-pointer hover:bg-[#0A0A0A]">Vendidos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="available">
                            <DataTable columns={availableColumns} data={availableProducts} createButton={<ProductCreateDialog />} filters={filters}/>
                        </TabsContent>

                        <TabsContent value="pending">
                            <DataTable columns={availableColumns} data={pendingProducts} createButton={<ProductCreateDialog />} filters={filters}/>
                        </TabsContent>

                        <TabsContent value="sold">
                            <DataTable columns={availableColumns} data={soldProducts} createButton={<ProductCreateDialog />} filters={filters}/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}

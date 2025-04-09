import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Percent, BookOpen, LayoutGrid, Gem, Users, Truck, PackageSearch, Calculator, NotebookPen, Tag, Sparkle } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Página Inicial',
        href: route('dashboard.index'),
        icon: LayoutGrid,
    },
    {
        title: 'Produtos',
        href: route('products.index'),
        icon: Gem,
    },
    {
        title: 'Taxas',
        href: route('taxes.index'),
        icon: Percent,
    },
    {
        title: 'Produtos por Encomenda',
        href: route('products-to-order.index'),
        icon: PackageSearch,
    },
    {
        title: 'Simulação',
        href: '#',
        icon: Calculator,
    },
];

const otherNavItems: NavItem[] = [
    {
        title: 'Clientes',
        href: route('customers.index'),
        icon: Users,
    },
    {
        title: 'Fornecedores',
        href: route('suppliers.index'),
        icon: Truck,
    },
    {
        title: 'Categorias',
        href: '#',
        icon: Tag,
    },
    {
        title: 'Detalhes',
        href: '#',
        icon: Sparkle,
    },
    {
        title: 'Anotações',
        href: route('notes.index'),
        icon: NotebookPen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Meu Site',
        href: 'https://google.com',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} otherItems={otherNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

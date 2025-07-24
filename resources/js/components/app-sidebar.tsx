import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Percent, LayoutGrid, Gem, Users, Truck, Calculator, Tag, CalendarSearch } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Página Inicial',
        href: route('dashboard.index'),
        icon: LayoutGrid,
    },
    {
        title: 'Produtos',
        href: '/products',
        icon: Gem,
    },
    {
        title: 'Taxas',
        href: '/taxes',
        icon: Percent,
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
        href: route('categories.index'),
        icon: Tag,
    },
    {
        title: 'Lotes',
        href: route('batches.index'),
        icon: CalendarSearch,
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ 
    items = [],
    otherItems = []
}: { 
    items?: NavItem[] 
    otherItems?: NavItem[]
}) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Menus Principais</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton  
                            asChild isActive={item.href === window.location.origin + page.url}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>

            <SidebarGroupLabel className="mt-3">Outros</SidebarGroupLabel>
            <SidebarMenu>
                {otherItems.map((otherItem) => (
                    <SidebarMenuItem key={otherItem.title}>
                        <SidebarMenuButton  
                            asChild isActive={otherItem.href === window.location.origin + page.url}
                            tooltip={{ children: otherItem.title }}
                        >
                            <Link href={otherItem.href} prefetch>
                                {otherItem.icon && <otherItem.icon />}
                                <span>{otherItem.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

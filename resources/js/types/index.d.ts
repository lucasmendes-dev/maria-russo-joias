import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type Product = {
    id: string,
    name: string,
    quantity: string,
    price: string,
    category_id: string,
    description: string,
    color: string,
    purchase_date: string,
    supplier_id: string,
    image: string,
    status: string;
}

export type ProductProps = {
    availableProducts: Product[],
    pendingProducts: Product[],
    soldProducts: Product[],
    categories: Category[],
    suppliers: Supplier[]
}

export interface ProductFormProps {
    name: string,
    quantity: string,
    price: string,
    category_id: string,
    description: string,
    color: string,
    purchase_date: string,
    supplier_id: string,
    image: string,
    status: string;
    setName: (value: string) => void;
    setQuantity: (value: string) => void;
    setPrice: (value: string) => void;
    setCategoryId: (value: string) => void;
    setDescription: (value: string) => void;
    setColor: (value: string) => void;
    setPurchaseDate: (value: string) => void;
    setSupplierId: (value: string) => void;
    setImage: (value: string) => void;
    setStatus: (value: string) => void;
    categories: Category[];
    suppliers: Supplier[];
}

export interface UpdateDialogProps {
    product: Product;
    open: boolean;
    setOpen: (value: boolean) => void;
    categories: Category[];
    suppliers: Supplier[];
}


export type Category = {
    id: string,
    name: string,
}

export type Supplier = {
    id: string,
    name: string,
}


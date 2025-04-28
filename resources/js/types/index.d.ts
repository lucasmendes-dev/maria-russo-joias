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

export interface DateRangePickerProps {
    startDate: string,
    endDate: string,
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
}

////////////////////////////////// Products //////////////////////////////////
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

export interface ProductFormProps {
    name: string,
    quantity: string,
    price: string,
    category_id: string,
    description: string,
    color: string,
    purchase_date: string,
    supplier_id: string,
    image: File | null,
    status: string;
    setName: (value: string) => void;
    setQuantity: (value: string) => void;
    setPrice: (value: string) => void;
    setCategoryId: (value: string) => void;
    setDescription: (value: string) => void;
    setColor: (value: string) => void;
    setPurchaseDate: (value: string) => void;
    setSupplierId: (value: string) => void;
    setImage: (value: File | null) => void;
    setStatus: (value: string) => void;
    categories: Category[];
    suppliers: Supplier[];
}

export interface UpdateProductDialogProps {
    product: Product;
    open: boolean;
    setOpen: (value: boolean) => void;
    categories: Category[];
    suppliers: Supplier[];
}

export type ProductProps = {
    availableProducts: Product[],
    pendingProducts: Product[],
    soldProducts: Product[],
    categories: Category[],
    suppliers: Supplier[]
}


////////////////////////////////// Taxes //////////////////////////////////
export type Tax = {
    id: string,
    name: string,
    percentage: number,
    price: number,
    category_id: string,
    description: string,
    start_date: string,
    end_date: string,
    spread_tax: boolean,
    tax_activated: boolean,
}

export interface TaxFormProps {
    name: string;
    percentage: number,
    price: number,
    category_id: string,
    description: string,
    start_date: string,
    end_date: string,
    spread_tax: boolean,
    tax_activated: boolean,
    setName: (value: string) => void;
    setPercentage: (value: number) => void;
    setPrice: (value: number) => void;
    setCategoryId: (value: string) => void;
    setDescription: (value: string) => void;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    setSpreadTax: (value: boolean) => void;
    setTaxActivated: (value: boolean) => void;
    categories: Category[];
}

export interface UpdateTaxDialogProps {
    tax: Tax;
    open: boolean;
    setOpen: (value: boolean) => void;
    categories: Category[];
}

////////////////////////////////// Customers //////////////////////////////////
export type Customer = {
    id: string
    name: string
    phone: string
    local: string
}

export interface CustomerFormProps {
    name: string;
    phone: string;
    local: string;
    setName: (value: string) => void;
    setPhone: (value: string) => void;
    setLocal: (value: string) => void;
}

export interface UpdateCustomerDialogProps {
    customer: Customer;
    open: boolean;
    setOpen: (value: boolean) => void;
}

////////////////////////////////// Suppliers //////////////////////////////////

export type Supplier = {
    id: string
    name: string
    phone: string
    social_media: string
    local: string
    saller_name: string
}

export interface SupplierFormProps {
    name: string;
    phone: string;
    socialMedia: string;
    local: string;
    sallerName: string;
    setName: (value: string) => void;
    setPhone: (value: string) => void;
    setSocialMedia: (value: string) => void;
    setLocal: (value: string) => void;
    setSallerName: (value: string) => void;
}

interface UpdateSupplierDialogProps {
    supplier: Supplier;
    open: boolean;
    setOpen: (value: boolean) => void;
}

////////////////////////////////// Categories //////////////////////////////////
export type Category = {
    id: string,
    name: string,
    description: string,
}

export interface CategoryFormProps {
    name: string;
    description: string;
    setName: (value: string) => void;
    setDescription: (value: string) => void;
}

export interface UpdateCategoryDialogProps {
    category: Category;
    open: boolean;
    setOpen: (value: boolean) => void;
}

////////////////////////////////// Details //////////////////////////////////
export type Detail = {
    id: string
    name: string
    description: string
}

export interface DetailFormProps {
    name: string;
    description: string;
    setName: (value: string) => void;
    setDescription: (value: string) => void;
}

export interface UpdateDetailDialogProps {
    detail: Detail;
    open: boolean;
    setOpen: (value: boolean) => void;
}

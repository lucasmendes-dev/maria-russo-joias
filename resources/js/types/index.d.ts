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
    status: string,
    selling_price: number,
    payment_method: string,
    customer: string,
    customer_id: string,
    discount: number
    installment_value: string
    sold_date: Date|undefined,
    reserved_value: number,
    reserved_date: string,
    sold_price: number,
    installments: number,
    current_installment: number,
    date_to_end: string,
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
    reservedProducts: Product[],
    pendingProducts: Product[],
    soldProducts: Product[],
    categories: Category[],
    suppliers: Supplier[],
    customers: Customer[],
}

////////////////////////////////// Sales //////////////////////////////////
export interface SalesDialogProps {
    product: {
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
        status: string,
        selling_price: number,
        reserved_value: number,
        customer: string
    };
    customers: Customer[];
    salesOpen: boolean;
    setSalesOpen: (value: boolean) => void;
}

export interface SalesFormProps {
    name: string,
    sellingPrice: number,
    quantity: number,
    paymentMethod: string,
    discountValue: string,
    installmentValue: string,
    date: Date|undefined,
    firstInstallmentDate: Date|undefined,
    firstInstallmentValue: number|null,
    setName: (value: string) => void,
    setSellingPrice: (value: number) => void,
    setQuantity: (value: number) => void,
    setPaymentMethod: (value: string) => void,
    setDiscountValue: (value: string) => void,
    setInstallmentValue: (value: string) => void,
    setDate: (value: Date|undefined) => void,
    customers: Customer[],
    setCustomer: (value: string) => void,
    setFirstInstallmentDate: (value: Date|undefined) => void,
    setFirstInstallmentValue: (value: number|null) => void,
}

export interface UpdateSoldDialogProps {
    soldProduct: {
        id: string,
        name: string,
        selling_price: number,
        payment_method: string,
        customer: string,
        discount: string
        installment_value: string
        sold_date: Date|undefined
    },
    open: boolean;
    setOpen: (value: boolean) => void;
}

////////////////////////////////// Reserved //////////////////////////////////
export interface UpdateReservedDialogProps {
    product: Product;
    reservedOpen: boolean;
    setReservedOpen: (value: boolean) => void;
    customers: Customer[],
}

export interface ReservedFormProps {
    name: string,
    price: string,
    description: string,
    reserved_date: string,
    setName: (value: string) => void;
    setPrice: (value: string) => void;
    setDescription: (value: string) => void;
    setReserveDate: (value: string) => void;
    customers: Customer[],
    setCustomer: (value: string) => void,
}

////////////////////////////////// Pending //////////////////////////////////
export interface PendingDialogProps {
    product: {
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
        status: string,
        selling_price: number,
        reserved_value: number,
        customer_id: string,
        sold_price: number,
        payment_method: string,
        discount: number|undefined,
        installments: number,
        current_installment: number,
        date_to_end: string,
    };
    customers: Customer[],
    pendingOpen: boolean;
    setPendingOpen: (value: boolean) => void;
}

export interface PendingFormProps {
    name: string,
    soldPrice: number,
    quantity: number,
    paymentMethod: string,
    customer: string,
    discountValue: number|undefined,
    installments: number,
    currentInstallment: number,
    purchaseDate: Date|undefined,
    dateToEnd: Date|undefined,
    customers: Customer[],
    setName: (value: string) => void,
    setSoldPrice: (value: number) => void,
    setQuantity: (value: number) => void,
    setPaymentMethod: (value: string) => void,
    setCustomer: (value: string) => void,
    setDiscountValue: (value: number) => void,
    setInstallments: (value: number) => void,
    setCurrentInstallment: (value: number) => void,
    setPurchaseDate: (value: Date|undefined) => void,
    setDateToEnd: (value: Date|undefined) => void,
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

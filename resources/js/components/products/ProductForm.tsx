import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface ProductFormProps {
    name: string,
    quantity: number,
    price: number,
    category_id: number,
    description: string,
    color: string,
    purchase_date: Date,
    supplier_id: number,
    image: string,
    status: string;
    setName: (value: string) => void;
    setQuantity: (value: number) => void;
    setPrice: (value: number) => void;
    setCategoryId: (value: number) => void;
    setDescription: (value: string) => void;
    setColor: (value: string) => void;
    setPurchaseDate: (value: Date) => void;
    setSupplierId: (value: number) => void;
    setImage: (value: string) => void;
    setStatus: (value: string) => void;
}

export function ProductForm({
    name,
    quantity,
    price,
    category_id,
    description,
    color,
    purchase_date,
    supplier_id,
    image,
    status,
    setName,
    setQuantity,
    setPrice,
    setCategoryId,
    setDescription,
    setColor,
    setPurchaseDate,
    setSupplierId,
    setImage,
    setStatus
}: ProductFormProps) {
    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome <span className="text-red-400">*</span></Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantidade <span className="text-red-400">*</span></Label>
                <Input id="quantity" value={quantity} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Preço <span className="text-red-400">*</span></Label>
                <Input id="quantity" value={price} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Categoria</Label>
                <Input id="quantity" value={category_id} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Descrição</Label>
                <Input id="quantity" value={description} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Cor</Label>
                <Input id="quantity" value={color} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Data de Compra</Label>
                <Input id="quantity" value={purchase_date} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Fornecedor</Label>
                <Input id="quantity" value={supplier_id} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Imagem</Label>
                <Input id="quantity" value={image} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Maria" />
            </div>

            <p className="text-sm text-gray-600 flex justify-end">
                <span className="text-red-400">*</span> campo obrigatório
            </p>
        </div>
    );
}

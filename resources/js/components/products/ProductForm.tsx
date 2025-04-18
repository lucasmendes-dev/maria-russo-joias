import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFormProps {
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
    const parsedDate = purchase_date
        ? (() => {
            const [year, month, day] = purchase_date.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day));
        })()
        : undefined;

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded py-3 px-4 mb-3" required placeholder="Ex: Maria" />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Preço <span className="text-red-400">*</span></Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="appearance-none block w-full rounded py-3 px-4 mb-3" required placeholder="Ex: R$60.90" />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="quantity" className="block mb-2">Quantidade <span className="text-red-400">*</span></Label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="appearance-none block w-full rounded py-3 px-4 mb-3" required placeholder="Ex: Maria" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="color" className="block mb-2">Cor</Label>
                    <Input id="color" type="text" value={color} onChange={(e) => setColor(e.target.value)} className="appearance-none block w-full rounded py-3 px-4 mb-3" required placeholder="Ex: azul" />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="purchase_date" className="block mb-2">Data de Compra <span className="text-red-400">*</span></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal cursor-pointer",
                                    !parsedDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {parsedDate ? format(parsedDate, "PPP", {locale: ptBR}) : <span>Escolha uma Data</span>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={parsedDate}
                                onSelect={(date) => {
                                    if (date) {
                                        const formatted = format(date, "yyyy-MM-dd");
                                        setPurchaseDate(formatted);
                                    }
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="supplier_id" className="block mb-2">Fornecedor <span className="text-red-400">*</span></Label>
                    <Select>
                        <SelectTrigger >
                            <SelectValue placeholder="Fornecedor" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fornecedores</SelectLabel>
                                {/* {suppliers.map((supplier) => (
                                    <SelectItem key={supplier_id} value={String(supplier.id)}>
                                        {supplier.name}
                                    </SelectItem>
                                ))} */}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="category_id" className="block mb-2">Categoria</Label>
                    <Select>
                        <SelectTrigger >
                            <SelectValue placeholder="Categoria" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categorias</SelectLabel>
                                {/* {categories.map((category) => (
                                    <SelectItem key={category_id} value={String(category.id)}>
                                        {category.name}
                                    </SelectItem>
                                ))} */}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-full px-3 mb-4 md:mb-0">
                    <Label htmlFor="description" className="block mb-2">Descrição</Label>
                    <Textarea
                        className="col-span-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4 justify-center">
                <div className="w-full md:w-2/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="image" className="block mb-2">Imagem</Label>
                    <Input id="image" type="file" className="cursor-pointer"/>
                </div>
            </div>

        </form>
    );
}

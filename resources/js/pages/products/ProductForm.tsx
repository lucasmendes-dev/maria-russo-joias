import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ProductFormProps } from "@/types";
import { parseSingleDate } from "@/utils/functions-lib";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export function ProductForm({
    name,
    quantity,
    price,
    category_id,
    description,
    color,
    purchase_date,
    supplier_id,
    setName,
    setQuantity,
    setPrice,
    setCategoryId,
    setDescription,
    setColor,
    setPurchaseDate,
    setSupplierId,
    setImage,
    categories,
    suppliers
}: ProductFormProps) {
    const parsedDate = parseSingleDate(purchase_date);

    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: Anel Solitário Curvado" />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Preço (R$) <span className="text-red-400">*</span></Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: R$60.90" />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="quantity" className="block mb-2">Quantidade <span className="text-red-400">*</span></Label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: Maria" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="color" className="block mb-2">Cor</Label>
                    <Input id="color" type="text" value={color} onChange={(e) => setColor(e.target.value)} className="appearance-none block w-full rounded-lg py-3 px-4 mb-3" required placeholder="Ex: azul" />
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

                        <PopoverContent className="w-auto p-0 pointer-events-auto">
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
                                defaultMonth={parsedDate}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="supplier_id" className="block mb-2">Fornecedor <span className="text-red-400">*</span></Label>
                    <Select
                        value={String(supplier_id)}
                        onValueChange={(value) => setSupplierId(value)}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder="Fornecedor" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {suppliers.map((supplier) => (
                                    <SelectItem key={supplier.id} value={String(supplier.id)}>
                                        {supplier.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="category_id" className="block mb-2">Categoria <span className="text-red-400">*</span></Label>
                    <Select
                        value={String(category_id)}
                        onValueChange={(value) => setCategoryId(value)}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder="Categoria" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {categories.filter((category) => category.name !== "Todos")
                                .map((category) => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        {category.name}
                                    </SelectItem>
                                ))}
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
                    <Input id="image" type="file" className="cursor-pointer" onChange={(e) => setImage(e.target.files?.[0] || null)}/>
                </div>
            </div>
        </form>
    );
}

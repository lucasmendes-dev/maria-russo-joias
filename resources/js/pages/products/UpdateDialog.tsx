import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { UpdateProductDialogProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export function UpdateDialog({
    product,
    open,
    setOpen,
    categories,
    suppliers
}: UpdateProductDialogProps) {
    const [name, setName] = useState(product.name);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    const [category_id, setCategoryId] = useState(product.category_id);
    const [description, setDescription] = useState(product.description);
    const [color, setColor] = useState(product.color);
    const [purchase_date, setPurchaseDate] = useState(product.purchase_date);
    const [supplier_id, setSupplierId] = useState(product.supplier_id);
    const [image, setImage] = useState<File|null>(null);
    const [status, setStatus] = useState(product.status);

    const handleUpdate = () => {
        const formData = new FormData();
        
        formData.append('_method', 'PUT'); // setting PUT method

        formData.append('name', name);
        formData.append('quantity', String(quantity));
        formData.append('price', String(price));
        formData.append('color', color);
        formData.append('purchase_date', purchase_date);
        formData.append('supplier_id', String(supplier_id));
        formData.append('category_id', String(category_id));
        formData.append('description', description);
        formData.append('status', status);

        if (image) {
            formData.append('image', image);
        }
        router.post(`/products/${product.id}`, formData, {  //using 'post' instead of 'put' to send image to laravel
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 bg-blue-400 cursor-pointer">
                    <Pencil />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar produto: <span className="text-blue-400">{ product.name }</span></DialogTitle>
                </DialogHeader>

                <DialogDescription>Verifique os dados antes de alterá-los.</DialogDescription>

                <ProductForm
                    name={name}
                    quantity={quantity}
                    price={price}
                    category_id={category_id}
                    description={description}
                    color={color}
                    purchase_date={purchase_date}
                    supplier_id={supplier_id}
                    image={image}
                    status={status}
                    setName={setName}
                    setQuantity={setQuantity}
                    setPrice={setPrice}
                    setCategoryId={setCategoryId}
                    setDescription={setDescription}
                    setColor={setColor}
                    setPurchaseDate={setPurchaseDate}
                    setSupplierId={setSupplierId}
                    setImage={setImage}
                    setStatus={setStatus}
                    categories={categories}
                    suppliers={suppliers}
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

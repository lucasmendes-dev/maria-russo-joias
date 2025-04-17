import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";

interface UpdateDialogProps {
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
        status: string;
    };
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function UpdateDialog({ product, open, setOpen }: UpdateDialogProps) {
    const [name, setName] = useState(product.name);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    const [category_id, setCategoryId] = useState(product.category_id);
    const [description, setDescription] = useState(product.description);
    const [color, setColor] = useState(product.color);
    const [purchase_date, setPurchaseDate] = useState(product.purchase_date);
    const [supplier_id, setSupplierId] = useState(product.supplier_id);
    const [image, setImage] = useState(product.image);
    const [status, setStatus] = useState(product.status);

    const handleUpdate = () => {
        router.put(`/products/${product.id}`, {
            name,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setOpen(false);
            }
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
                />

                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleUpdate}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

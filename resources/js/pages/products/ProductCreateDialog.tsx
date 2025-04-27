import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import { router } from "@inertiajs/react";
import { Category, Supplier } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export function ProductCreateDialog({
    categories,
    suppliers
}: {
    categories: Category[],
    suppliers: Supplier[]
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [price, setPrice] = useState("0");
    const [category_id, setCategoryId] = useState("0");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [purchase_date, setPurchaseDate] = useState("");
    const [supplier_id, setSupplierId] = useState("0");
    const [image, setImage] = useState<File|null>(null);
    const [status, setStatus] = useState("");

    const handleCreate = () => {
        if (!name || !price || !quantity || !purchase_date || !supplier_id) {
            alert("Os campos com * são obrigatórios!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('color', color);
        formData.append('purchase_date', purchase_date);
        formData.append('supplier_id', supplier_id);
        formData.append('category_id', category_id);
        formData.append('description', description);
        formData.append('status', status);

        if (image) {
            formData.append('image', image);
        }

        router.post("/products", formData, {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Cadastrar Produto</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar novo produto</DialogTitle>
                </DialogHeader>

                <DialogDescription>Insira os dados para cadastrar o produto.</DialogDescription>

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
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Produto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

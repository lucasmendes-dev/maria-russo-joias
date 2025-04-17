import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import { router } from "@inertiajs/react";

export function ProductCreateDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [price, setPrice] = useState("0");
    const [category_id, setCategoryId] = useState("0");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [purchase_date, setPurchaseDate] = useState("");
    const [supplier_id, setSupplierId] = useState("0");
    const [image, setImage] = useState("");
    const [status, setStatus] = useState("");

    const handleCreate = () => {
        if (!name) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        router.post("/products", {
            name,
        }, {
            onSuccess: () => setOpen(false),
            preserveScroll: true,
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
                    <Button onClick={handleCreate} className="cursor-pointer">Cadastar Produto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

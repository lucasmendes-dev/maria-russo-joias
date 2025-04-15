import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { formatPhoneNumber } from "@/utils/phoneFormatter";
import { Textarea } from "@/components/ui/textarea"

interface CategoryFormProps {
    name: string;
    phone: string;
    local: string;
    setName: (value: string) => void;
    setPhone: (value: string) => void;
    setLocal: (value: string) => void;
}

export function CategoryForm({
    name,
    phone,
    local,
    setName,
    setPhone,
    setLocal,
}: CategoryFormProps) {
    const [formattedPhone, setFormattedPhone] = useState('');

    useEffect(() => {
        setFormattedPhone(formatPhoneNumber(phone));
    }, [phone]);

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome <span className="text-red-400">*</span></Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Colar" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="local" className="text-right">Descrição</Label>
                <Textarea
                    className="col-span-3"
                />
            </div>
            <p className="text-sm text-gray-600 flex justify-end">
                <span className="text-red-400">*</span> campo obrigatório
            </p>
        </div>
    );
}

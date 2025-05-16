import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { formatPhoneNumber } from "@/utils/functions-lib";
import { SupplierFormProps } from "@/types";

export function SupplierForm({
    name,
    phone,
    socialMedia,
    local,
    sallerName,
    setName,
    setPhone,
    setSocialMedia,
    setLocal,
    setSallerName
}: SupplierFormProps) {
    const [formattedPhone, setFormattedPhone] = useState('');

    useEffect(() => {
        setFormattedPhone(formatPhoneNumber(phone));
    }, [phone]);

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const formattedValue = formatPhoneNumber(rawValue);
        setFormattedPhone(formattedValue);
        setPhone(rawValue);
    };

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome <span className="text-red-400">*</span></Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Rei da Prata"/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Telefone</Label>
                <Input
                    id="phone"
                    type="text"
                    value={formattedPhone}
                    onChange={handlePhoneChange}
                    className="col-span-3"
                    placeholder="(XX) XXXX-XXXX"
                />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="social_media" className="text-right">Rede Social</Label>
                <Input id="social_media" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)} className="col-span-3" placeholder="@name / www.seusite.com"/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="saller_name" className="text-right">Vendedor</Label>
                <Input id="saller_name" value={sallerName} onChange={(e) => setSallerName(e.target.value)} className="col-span-3" required placeholder="Vendedor(a)"/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="local" className="text-right">Local <span className="text-red-400">*</span></Label>
                <Input id="local" value={local} onChange={(e) => setLocal(e.target.value)} className="col-span-3" placeholder="Ex: Internet"/>
            </div>
            <p className="text-sm text-gray-600 flex justify-end">
                <span className="text-red-400">*</span> campo obrigatório
            </p>
        </div>
    );
}

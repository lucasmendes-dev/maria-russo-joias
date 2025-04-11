import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { formatPhoneNumber } from "@/utils/phoneFormatter";

interface CustomerFormProps {
    name: string;
    phone: string;
    local: string;
    setName: (value: string) => void;
    setPhone: (value: string) => void;
    setLocal: (value: string) => void;
}

export function CustomerForm({
    name,
    phone,
    local,
    setName,
    setPhone,
    setLocal,
}: CustomerFormProps) {
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
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Telefone <span className="text-red-400">*</span></Label>
                <Input
                    id="phone"
                    type="text"
                    value={formattedPhone}
                    onChange={handlePhoneChange}
                    className="col-span-3"
                    required
                    placeholder="(XX) XXXX-XXXX"
                />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="local" className="text-right">Local <span className="text-red-400">*</span></Label>
                <Input id="local" value={local} onChange={(e) => setLocal(e.target.value)} className="col-span-3" required />
            </div>
            <p className="text-sm text-gray-600 flex justify-end">
                <span className="text-red-400">*</span> campo obrigatório
            </p>
        </div>
    );
}

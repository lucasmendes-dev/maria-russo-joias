import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, use } from "react";

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
    const formatPhoneNumber = (value: string) => {
        if (!value) {
            return '';
        }

        const cleaned = ('' + value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{0,5})(\d{0,4})$/);

        if (match) {
            const ddd = match[1];
            const part1 = match[2];
            const part2 = match[3];

            let formatted = `(${ddd})`;
            if (part1) {
                formatted += ` ${part1}`;
            }
            if (part2) {
                formatted += `-${part2}`;
            }        console.log(formatted);
            return formatted;
        }

        return value;
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const formattedValue = formatPhoneNumber(rawValue);
        setFormattedPhone(formattedValue);

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
                    type="number"
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
            <p className="text-sm text-gray-600 flex justify-end"><span className="text-red-400">*</span>campo obrigatório</p>
        </div>
    );
}

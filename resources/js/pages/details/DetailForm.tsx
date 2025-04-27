import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { DetailFormProps } from "@/types";

export function DetailForm({
    name,
    description,
    setName,
    setDescription,
}: DetailFormProps) {
    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome <span className="text-red-400">*</span></Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required placeholder="Ex: Diamantado(a)" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="local" className="text-right">Descrição</Label>
                <Textarea
                    className="col-span-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <p className="text-sm text-gray-600 flex justify-end">
                <span className="text-red-400">*</span> campo obrigatório
            </p>
        </div>
    );
}

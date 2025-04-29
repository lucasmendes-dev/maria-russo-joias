import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaxFormProps } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "./DateRangePicker";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export function TaxForm({
    name,
    percentage,
    price,
    category_id,
    description,
    start_date,
    end_date,
    spread_tax,
    tax_activated,
    setName,
    setPercentage,
    setPrice,
    setCategoryId,
    setDescription,
    setStartDate,
    setEndDate,
    setSpreadTax,
    setTaxActivated,
    categories
}: TaxFormProps) {
    return (
        <form className="w-full max-w-lg mt-3">
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-2/3 px-3 mb-4 md:mb-0">
                    <Label htmlFor="name" className="block mb-2">Nome <span className="text-red-400">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full rounded py-3 px-4 mb-3" required placeholder="Ex: Lucro / Frete" />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
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
                                <SelectLabel>Taxa será aplicada para:</SelectLabel>
                                {categories.map((category) => (
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
                <div className="w-full md:w-1/4 px-3">
                    <Label htmlFor="percentage" className="block mb-2">Porcentagem</Label>
                    <Input id="percentage" type="number" value={percentage} onChange={(e) => setPercentage(Number(e.target.value))} className="appearance-none block w-full rounded py-3 px-4 mb-3" placeholder="Ex: Maria" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                    <Label htmlFor="price" className="block mb-2">Preço</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="appearance-none block w-full rounded py-3 px-4 mb-3" placeholder="Ex: 25,50" />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <Label htmlFor="period" className="block mb-2">Período</Label>
                    <DatePickerWithRange
                        startDate={start_date}
                        endDate={end_date}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="spread_tax" className="block mb-2">Divisão da Taxa <span className="text-red-400">*</span></Label>
                    <Select
                        value={spread_tax ? "1" : "0"}
                        onValueChange={(value) => setSpreadTax(value === "1")}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder="Escolha uma opção" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>A taxa será dividida entre os produtos?</SelectLabel>
                                <SelectItem value="1">Sim</SelectItem>
                                <SelectItem value="0">Não</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <Label htmlFor="spread_tax" className="block mb-2">Taxa Ativa <span className="text-red-400">*</span></Label>
                    <Select
                        value={tax_activated ? "1" : "0"}
                        onValueChange={(value) => setTaxActivated(value === "1")}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder="Escolha uma opção" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Ativar taxa?</SelectLabel>
                                <SelectItem value="1">Sim</SelectItem>
                                <SelectItem value="0">Não</SelectItem>
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

            <p className="text-sm text-gray-600 flex justify-end">
                <span className="text-red-400">*</span> campo obrigatório
            </p>
        </form>
    );
}

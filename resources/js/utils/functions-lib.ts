import { toast } from "sonner";

export function formatPhoneNumber(value: string): string {
    if (!value) {
        return "";
    }
    const cleaned = value.replace(/\D/g, "");
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
        }
        return formatted;
    }
    return value;
}

export function formatToBRCurrency(price: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(price);
}

export async function sendTaxActivatedPatchRequest(rowId: string, checked: boolean): Promise<void> {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const response = await fetch(`/updateActivatedStatus/${rowId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrfToken ?? '',
        },
        body: JSON.stringify({
            tax_activated: checked ? 1 : 0
        }),
    });

    if (!response.ok) {
        throw new Error('Erro na requisição');
    }

    showToast(response);
}

async function showToast(response: Response) {
    const data = await response.json();
    if (data.success) {
        toast.success("Aviso:", {
            description: data.message,
        });
    } else {
        toast.error("Erro:", {
            description: "Erro ao atualizar status da taxa.",
        });
    }
}

export const parseDateString = (dateString: string | undefined): Date | undefined => {
    if (!dateString) {
        return undefined;
    }
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    return undefined;
};

export function parseSingleDate(dateValue: string) {
    return dateValue
        ? (() => {
            const [year, month, day] = dateValue.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day));
        })()
        : undefined;
};

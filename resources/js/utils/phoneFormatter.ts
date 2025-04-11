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

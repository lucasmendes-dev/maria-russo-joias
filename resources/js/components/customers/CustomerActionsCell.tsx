import { UpdateDialog } from "./update-dialog";
import { AlertDialogDelete } from "./alert-dialog-delete";
import { useState } from "react";
import { Customer } from "./columns";

interface Props {
    customer: Customer;
    formatPhoneNumber: (phone: string) => string;
}

export function CustomerActionsCell({ customer, formatPhoneNumber }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <UpdateDialog
                customer={customer}
                formatPhoneNumber={formatPhoneNumber}
                open={isDialogOpen}
                setOpen={setIsDialogOpen}
            />
            <AlertDialogDelete customer={customer} />
        </div>
    );
}
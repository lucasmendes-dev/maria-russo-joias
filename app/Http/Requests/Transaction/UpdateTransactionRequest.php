<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => ['required', 'numeric'],
            'sold_price' => ['required', 'numeric'],
            'quantity' => ['required', 'numeric'],
            'payment_method' => ['required', 'string'],
            'customer_id' => ['required', 'numeric'],
            'discount' => ['numeric', 'nullable'],
            'installments' => ['required', 'numeric'],
            'current_installment' => ['required', 'numeric'],
            'sold_date' => ['required', 'string'],
        ];
    }
}

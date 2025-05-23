<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
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
            'name' => ['string', 'nullable'],
            'price' => ['required', 'numeric'],
            'quantity' => ['required', 'numeric'],
            'payment_method' => ['required', 'string'],
            'customer_id' => ['required', 'string'],
            'discount' => ['numeric', 'nullable'],
            'installments' => ['numeric', 'nullable'],
            'date' => ['required', 'string'],
            'firstInstallmentDate' => ['string', 'nullable'],
            'firstInstallmentValue' => ['numeric', 'nullable'],
        ];
    }
}

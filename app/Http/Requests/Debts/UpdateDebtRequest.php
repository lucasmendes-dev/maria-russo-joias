<?php

namespace App\Http\Requests\Debts;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDebtRequest extends FormRequest
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
            'customer_id' => ['required', 'numeric'],
            'installments' => ['required', 'numeric'],
            'current_installment' => ['required', 'numeric'],
            'installment_value' => ['required', 'numeric'],
            'date' => ['required', 'string'],
        ];
    }
}

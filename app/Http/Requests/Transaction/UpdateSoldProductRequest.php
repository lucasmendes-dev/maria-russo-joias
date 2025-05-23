<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSoldProductRequest extends FormRequest
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
            'sold_price' => ['required', 'numeric'],
            'payment_method' => ['required', 'string'],
            'discount' => ['numeric', 'nullable'],
            'sold_date' => ['required', 'string'],
        ];
    }
}

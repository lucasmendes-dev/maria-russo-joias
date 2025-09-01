<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class BatchSaleRequest extends FormRequest
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
            "customer" => 'string|required',
            "batchPrice" => 'numeric|required',
            "date" => 'string|required',
            "paymentMethod" => 'string|required',
            "installmentValue" => 'numeric|required',
            "products" => 'array|required',
        ];
    }
}

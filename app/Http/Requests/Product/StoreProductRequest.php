<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'quantity' => ['required', 'string'],
            'price' => ['required', 'string'],
            'category_id' => ['string'],
            'description' => ['string'],
            'color' => ['string'],
            'purchase_date' => ['required', 'string'],
            'supplier_id' => ['required', 'string'],
            'image' => ['string'],
            'status' => ['string', 'nullable']
        ];
    }
}

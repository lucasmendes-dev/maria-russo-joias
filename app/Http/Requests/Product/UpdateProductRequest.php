<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'quantity' => ['required', 'integer'],
            'price' => ['required', 'numeric'],   
            'category_id' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'purchase_date' => ['required', 'date'],
            'supplier_id' => ['required', 'integer'],
            'image' => ['nullable', 'image', 'mimes:png,jpg,jpeg,gif'],
            'status' => ['nullable', 'string']
        ];
    }
}

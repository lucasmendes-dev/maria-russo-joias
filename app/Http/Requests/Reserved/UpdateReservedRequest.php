<?php

namespace App\Http\Requests\Reserved;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservedRequest extends FormRequest
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
        'name' => ['string', 'nullable'],
            'product_id' => ['required', 'numeric'],
            'customer_id' => ['required', 'string'],
            'reserved_value' => ['required', 'numeric'],
            'reserved_date' => ['required', 'string'],
            'description' => ['string', 'nullable'],
        ];
    }
}

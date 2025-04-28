<?php

namespace App\Http\Requests\Tax;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaxRequest extends FormRequest
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
            'percentage' => ['numeric', 'nullable'],
            'price' => ['numeric', 'nullable'],
            'category_id' => ['required'],
            'description' => ['string', 'nullable'],
            'start_date' => ['string', 'nullable'],
            'end_date' => ['string', 'nullable'],
            'spread_tax' => ['required', 'boolean'],
            'tax_activated' => ['required', 'boolean'],
        ];
    }
}

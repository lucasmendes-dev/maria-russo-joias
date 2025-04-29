<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'category_id' => $this->category_id,
            'description' => $this->description,
            'color' => $this->color,
            'purchase_date' => $this->purchase_date,
            'supplier_id' => $this->supplier_id,
            'image' => $this->image,
            'status' => $this->status,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'mid'        => $request->mid,
            'nom' => $request->nom,
            'description' => $request->description,
            'unite' => $request->unite,
            'valMax'     => $request->valMax,
            'valMin'     => $request->valMin
        ];
    }
}

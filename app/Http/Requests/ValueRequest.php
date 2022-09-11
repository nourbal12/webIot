<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'mid' => 'required|min:1',
            'valeur' => 'required',
            'created_at'     => 'required',
            
        ];
    }
}
<?php

namespace App\Http\Requests;

use App\Rules\PhoneValidationRule;
use App\Rules\ZipCodeValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
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
            'name' => 'required|string|max:50',
            'contactPerson' => 'nullable|string|max:50',
            'email' => 'required|email|max:50',
            'phone' => ['required', 'string', new PhoneValidationRule()],
            'countyId' => 'required|integer|exists:counties,CountyId',
            'localityId' => 'required|integer|exists:localities,LocalityId',
            'street' => 'required|string|max:50',
            'nr' => 'required|string|max:10',
            'zipCode' => ['required', 'string', new ZipCodeValidationRule()],
        ];
    }
}

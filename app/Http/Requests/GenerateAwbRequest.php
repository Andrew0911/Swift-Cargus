<?php

namespace App\Http\Requests;

use App\Rules\PhoneValidationRule;
use App\Rules\ZipCodeValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GenerateAwbRequest extends FormRequest
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
            'senderName' => 'required|string|max:50',
            'senderContactPerson' => 'nullable|string|max:50',
            'senderEmail' => 'required|email|max:50',
            'senderPhone' => ['required', 'string', new PhoneValidationRule()],
            'senderCountyId' => 'required|integer|exists:counties,CountyId',
            'senderLocalityId' => 'required|integer|exists:localities,LocalityId',
            'senderStreet' => 'required|string|max:50',
            'senderNr' => 'required|string|max:10',
            'senderZipCode' => ['required', 'string', new ZipCodeValidationRule()],

            'recipientName' => 'required|string|max:50',
            'recipientContactPerson' => 'nullable|string|max:50',
            'recipientEmail' => 'required|email|max:50',
            'recipientPhone' => ['required', 'string', new PhoneValidationRule()],
            'recipientCountyId' => 'required|integer|exists:counties,CountyId',
            'recipientLocalityId' => 'required|integer|exists:localities,LocalityId',
            'recipientStreet' => 'required|string|max:50',
            'recipientNr' => 'required|string|max:10',
            'recipientZipCode' => ['required', 'string', new ZipCodeValidationRule()],

            'serviceId' => 'required|integer|min:1',
            'options' => 'nullable|array',

            'packages' => 'required|integer|min:1',
            'weight' => 'required|integer|min:1',
            'length' => 'required|integer|min:1',
            'width' => 'required|integer|min:1',
            'height' => 'required|integer|min:1',
        ];
    }
}

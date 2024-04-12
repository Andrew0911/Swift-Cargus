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
            'senderName' => 'required|string',
            'senderContactPerson' => 'required|string',
            'senderEmail' => 'required|email',
            'senderPhone' => ['required', 'string', new PhoneValidationRule()],
            'senderCountyId' => 'required|integer|exists:counties,CountyId',
            'senderLocalityId' => 'required|integer|exists:localities,LocalityId',
            'senderStreet' => 'required|string',
            'senderZipCode' => ['required', 'string', new ZipCodeValidationRule()],

            'recipientName' => 'required|string',
            'recipientContactPerson' => 'required|string',
            'recipientEmail' => 'required|email',
            'recipientPhone' => ['required', 'string', new PhoneValidationRule()],
            'recipientCountyId' => 'required|integer|exists:counties,CountyId',
            'recipientLocalityId' => 'required|integer|exists:localities,LocalityId',
            'recipientStreet' => 'required|string',
            'recipientZipCode' => ['required', 'string', new ZipCodeValidationRule()],

            'serviceId' => 'required|integer',
            'options' => 'required|array',

            'packages' => 'required|integer',
            'weight' => 'required|integer',
            'length' => 'required|integer',
            'width' => 'required|integer',
            'height' => 'required|integer',
        ];
    }
}

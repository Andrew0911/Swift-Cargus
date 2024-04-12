<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PhoneValidationRule implements Rule
{
    public function passes($attribute, $value)
    {
        return preg_match('/^(07|\+407)\d{8}$/', $value);
    }

    public function message()
    {
        return 'The :attribute must be a valid Romanian phone number.';
    }
}

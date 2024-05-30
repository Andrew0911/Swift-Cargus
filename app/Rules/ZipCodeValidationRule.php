<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ZipCodeValidationRule implements Rule
{
    public function passes($attribute, $value)
    {
        return preg_match('/^\d{6}$/', $value);
    }

    public function message()
    {
        return 'The :attribute must be a valid Romanian zip code.';
    }
}

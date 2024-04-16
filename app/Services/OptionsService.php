<?php

namespace App\Services;
use App\Models\Option;

class OptionsService
{
    public static function getTotalOptionsCost(array $options) : int
    {
        return Option::whereIn('Code', $options)->pluck('Cost')->sum();
    }

}
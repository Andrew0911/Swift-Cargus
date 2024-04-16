<?php

namespace App\Services;
use App\Repositories\ClientRepository;
use Carbon\Carbon;


class AwbService
{
    public static function getAwbNumber(int $userId, int $clientId) : string
    {
        $timestamp = microtime(true) * 10000;
        $random = mt_rand(100, 99999);
        $combined = $timestamp . $random;
    
        $partOne = substr($userId, 0, 1);
        $partTwo = substr($combined, -8);
        $partThree = substr($clientId, 0, 1);
        
        return $partOne . $partTwo . $partThree;
    }

    public static function calculateAwbValue(int $serviceId, array $options, int $length, int $width, int $height, float $weight, int $packageNo) : float
    {
        $baseRate = $serviceId === 1 ? floatval(config('costs.standard-base-rate')) : floatval(config('costs.heavy-base-rate'));
        $weightRate = $serviceId === 1 ? floatval(config('costs.standard-weight-rate')) : floatval(config('costs.heavy-weight-rate')); 
        $volumeRate = floatval(config('costs.volume-rate'));

        $volume = $length * $width * $height;
        $volumeCost = $volume * $volumeRate;
        $weightCost = $weight * $weightRate;

        $additionalPackageCost = ($packageNo - 1) * floatval(config('costs.additional-package-cost'));
        $optionsCost = OptionsService::getTotalOptionsCost($options);
    
        return $baseRate + $volumeCost + $weightCost + $additionalPackageCost + $optionsCost;
    }
}
<?php

namespace App\Services;
use App\Repositories\ClientRepository;
use Carbon\Carbon;


class AwbService
{
    public static function getAwbNumber(int $userId, int $clientId) : string
    {
        $hours = Carbon::now()->addHours(3)->hour;
        $minutes = Carbon::now()->addHours(3)->minute;
        $seconds = Carbon::now()->addHours(3)->format('s');

        $partOne = substr($userId, 0, 1);
        $partTwo = $seconds;
        $partThree = ($minutes + random_int(0, 100)) % 9 ===  0 ? 9 : ($minutes + random_int(0, 100)) % 9;
        $partFour =  ($hours + random_int(0, 100)) % 9 ===  0 ? 9 : ($hours + random_int(0, 100) % 9);
        $partFive = substr($clientId, 0, 1);

        return "4" . $partOne . $partTwo . $partThree . $partFour . $partFive;
    }

    public static function calculateAwbValue() : float
    {
        return 0;
    }
}
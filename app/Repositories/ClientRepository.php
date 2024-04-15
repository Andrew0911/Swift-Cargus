<?php

namespace App\Repositories;
use App\Models\Client;

class ClientRepository 
{
    public static function getClientId(int $userId) : int
    {
        return Client::where('UserId', $userId)->first()->ClientId;
    }

}
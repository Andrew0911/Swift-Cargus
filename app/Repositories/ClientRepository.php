<?php

namespace App\Repositories;
use App\Models\Client;

class ClientRepository 
{
    public static function getClientId() : int
    {
        return Client::where('UserId', auth()->user()->id)->first()->ClientId;
    }

}
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenerateAwbRequest;
use App\Repositories\ClientRepository;
use Symfony\Component\HttpFoundation\Response;

class AwbController extends Controller
{
    public function generateAWB(GenerateAwbRequest $request) : Response
    {
        dd(ClientRepository::getClientId());
        dd($request->all());
        return response();
    }
    
}

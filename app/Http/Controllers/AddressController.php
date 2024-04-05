<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocalityRequest;
use App\Models\County;
use App\Models\Locality;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddressController extends Controller
{
    public function counties(Request $request) : Response
    {
        return response(County::all()->toArray() ?? []);
    }

    public function localitiesByCounty(LocalityRequest $request) : Response
    {
        return response(Locality::where("CountyId", $request->countyId)->select(["LocalityId", "Name"])->get() ?? []);
    }
}

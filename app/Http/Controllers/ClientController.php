<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\Client;
use App\Models\County;
use App\Models\Locality;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class ClientController extends Controller
{
    public function getUserInformation() : Response
    {
        $user = auth()->user();
        return response([
            'Name' => $user->name,
            'Email' => $user->email,
            'Date' => Carbon::parse($user->created_at)->addHours(3)->format('Y-m-d H:i:s')
        ]);
    }

    public function getClientData(): Response
    {
        $userId = auth()->user()->id;
        $client = Client::where('UserId', $userId)->first();

        if(!($client->AddressId || $client->Phone)){
            return response([
                'Name' => $client->Name,
                'ContactPerson' => $client->Contact_Person,
                'Email' => $client->Email,
            ]);
        }

        $address = Address::where('AddressId', $client->AddressId)->first();
        $county = County::where('CountyId', $address->CountyId)->first();
        $locality = Locality::where('LocalityId', $address->LocalityId)->first();

        return response([
            'Name' => $client->Name,
            'ContactPerson' => $client->Contact_Person,
            'Email' => $client->Email,
            'Phone' => $client->Phone,
            'County' => $county->Name,
            'CountyId' => $county->CountyId,
            'Locality' => $locality->Name,
            'LocalityId' => $locality->LocalityId,
            'Street' => $address->Street,
            'Nr' => $address->Nr,
            'ZipCode' => $address->ZipCode
        ]);
    }

    public function saveOrUpdateClientInformation(AddressRequest $request) : Response
    {
        $userId = auth()->user()->id;
        $client = Client::where('UserId', $userId)->first();

        $client->update([
            'Name' => $request->name,
            'Phone' => $request->phone,
            'Email' => $request->email,
            'Contact_Person' => $request->contactPerson
        ]);

        if($client->AddressId == null)
        {
            $address = Address::create([
                'CountyId' => $request->countyId,
                'LocalityId' => $request->localityId,
                'Street' => $request->street,
                'Nr' => $request->nr,
                'ZipCode' => $request->zipCode
            ]);

            Client::where('ClientId', $client->ClientId)->update([
                'AddressId' => $address->AddressId
            ]);
        } else {
            Address::where('AddressId', $client->AddressId)->update([
                'CountyId' => $request->countyId,
                'LocalityId' => $request->localityId,
                'Street' => $request->street,
                'Nr' => $request->nr,
                'ZipCode' => $request->zipCode
            ]);
        }
        return response(['succes' => true]);
    }
}

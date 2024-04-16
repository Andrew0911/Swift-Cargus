<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenerateAwbRequest;
use App\Models\Address;
use App\Models\Awb;
use App\Models\Recipient;
use App\Models\Sender;
use App\Repositories\ClientRepository;
use App\Services\AwbService;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class AwbController extends Controller
{
    public function generateAWB(GenerateAwbRequest $request) : Response
    {
        $userId = auth()->user()->id;
        $clientId = ClientRepository::getClientId($userId);
        $awbNumber = AwbService::getAwbNumber($userId, $clientId);
        $awbDate = Carbon::now()->addHours(3)->toDateTimeString();
        $awbValue = AwbService::calculateAwbValue(
            $request->serviceId,
            $request->options,
            $request->length,
            $request->width,
            $request->height,
            $request->weight,
            $request->packages
        );

        $senderAddressId = Address::create([
            'CountyId' => $request->senderCountyId,
            'LocalityId' => $request->senderLocalityId,
            'Street' => $request->senderStreet,
            'Nr' => $request->senderNr,
            'ZipCode' => $request->senderZipCode,
        ])->AddressId;

        $senderId = Sender::create([
            'AddressId' => $senderAddressId,
            'Name' => $request->senderName,
            'Contact_person' => $request->senderContactPerson,
            'Email' => $request->senderEmail,
            'Phone' =>  $request->senderPhone
        ])->SenderId;

        $recipientAddressId = Address::create([
            'CountyId' => $request->recipientCountyId,
            'LocalityId' => $request->recipientLocalityId,
            'Street' => $request->recipientStreet,
            'Nr' => $request->recipientNr,
            'ZipCode' => $request->recipientZipCode,
        ])->AddressId;

        $recipientId = Recipient::create([
            'AddressId' => $recipientAddressId,
            'Name' => $request->recipientName,
            'Contact_person' => $request->recipientContactPerson,
            'Email' => $request->recipientEmail,
            'Phone' =>  $request->recipientPhone
        ])->RecipientId;

        Awb::create([
            'Awb' => $awbNumber,
            'ClientId' => $clientId,
            'SenderId' => $senderId,
            'RecipientId' => $recipientId,
            'Value' => $awbValue,
            'Date' => $awbDate,
            'ServiceId' => $request->serviceId,
            'Options' => implode("", $request->options),
            'PackageNo' => $request->packages,
            'Length' => $request->length,
            'Width' => $request->width,
            'Height' => $request->height,
            'Weight' => $request->weight,
            'StatusId' => 1
        ]);

        return response(['awbNumber' => $awbNumber]);
    }
    
}

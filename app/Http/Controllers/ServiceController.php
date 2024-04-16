<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetServiceOptionsRequest;
use App\Models\Service;
use Symfony\Component\HttpFoundation\Response;

class ServiceController extends Controller
{
    public function getOptionsByServiceId(GetServiceOptionsRequest $request) :  Response
    {
        return response(Service::join('service_options', 'services.ServiceId', '=', 'service_options.ServiceId')
                                ->join('options', 'options.OptionId', '=', 'service_options.OptionId')
                                ->where("services.ServiceId", $request->serviceId)
                                ->select(['options.Name', 'options.Description', 'options.Code'])
                                ->get() ?? []
        );
    }

}

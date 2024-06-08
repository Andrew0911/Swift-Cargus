<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/all-counties', [AddressController::class, 'counties']);
    Route::get('/all-localities-by-county', [AddressController::class, 'localitiesByCounty']);
    Route::get('/service-options', [ServiceController::class, 'getOptionsByServiceId']);
    Route::get('/user-information', [ClientController::class, 'getUserInformation']);
    Route::get('/client-data', [ClientController::class, 'getClientData']);
    Route::post('/save-or-update-client-information', [ClientController::class, 'saveOrUpdateClientInformation']);

    Route::prefix('awb')->group(
        base_path('routes/awb.php'),
    );

    Route::prefix('admin')->group(
        base_path('routes/admin.php'),
    );
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



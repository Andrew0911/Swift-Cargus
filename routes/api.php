<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/all-counties', [AddressController::class, 'counties']);
Route::get('/all-localities-by-county', [AddressController::class, 'localitiesByCounty']);
Route::get('/service-options', [ServiceController::class, 'getOptionsByServiceId']);


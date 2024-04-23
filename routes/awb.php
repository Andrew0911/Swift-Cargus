<?php

use App\Http\Controllers\AwbController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/generate-awb', [AwbController::class, 'generateAWB']);
Route::get('/get-awbs', [AwbController::class, 'getClientAwbs']);
Route::get('/get-each-status-awb-count', [AwbController::class, 'getEachStatusAwbCount']);

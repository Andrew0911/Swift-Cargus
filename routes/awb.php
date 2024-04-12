<?php

use App\Http\Controllers\AwbController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/generate-awb', [AwbController::class, 'generateAWB']);


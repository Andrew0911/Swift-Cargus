<?php

use App\Http\Controllers\AwbController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/current-month-awbs', [AwbController::class, 'getCurrentMonthAwbs']);
Route::get('/current-year-awbs', [AwbController::class, 'getCurrentYearAwbs']);
Route::get('/awb-details', [AwbController::class, 'getAdminAwbDetails']);
Route::post('/update-awb-status', [AwbController::class, 'updateAwbStatus']);
Route::get('/available-statuses-for-update', [AwbController::class, 'getAvailableStatusesForUpdateAwb']);

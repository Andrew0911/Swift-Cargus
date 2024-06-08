<?php

use App\Http\Controllers\AwbController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/current-month-awbs', [AwbController::class, 'getCurrentMonthAWBs']);

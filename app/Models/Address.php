<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'addresses';
    protected $primaryKey = 'AddressId';
    public $timestamps = false;
    protected $fillable = [
        'CountyId',
        'LocalityId',
        'Street',
        'Nr',
        'ZipCode'
    ];
}

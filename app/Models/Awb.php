<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Awb extends Model
{
    protected $table = 'awb';
    protected $primaryKey = 'Awb';
    public $timestamps = false;
    protected $fillable = [
        'Awb',
        'ClientId',
        'SenderId',
        'RecipientId',
        'Value',
        'Date',
        'ServiceId',
        'Options',
        'PackageNo',
        'Length',
        'Width',
        'Height',
        'Weight',
        'StatusId'
    ];
}

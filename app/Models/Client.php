<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';
    protected $primaryKey = 'ClientId';
    public $timestamps = false;
    
    protected $fillable = [
        'UserId',
        'AddressId',
        'Name',
        'Phone'
    ];
}

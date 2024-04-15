<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Sender extends Model
{
    protected $table = 'senders';
    protected $primaryKey = 'SenderId';
    public $timestamps = false;
    protected $fillable = [
        'AddressId',
        'Name',
        'Contact_person',
        'Email',
        'Phone'
    ];
}

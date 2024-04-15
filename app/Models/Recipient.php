<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    protected $table = 'recipients';
    protected $primaryKey = 'RecipientId';
    public $timestamps = false;
    protected $fillable = [
        'AddressId',
        'Name',
        'Contact_person',
        'Email',
        'Phone'
    ];
}

<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $table = 'statuses';
    protected $primaryKey = 'StatusId';
    public $timestamps = false;
    protected $fillable = [
        'StatusId',
        'Name',
    ];
}

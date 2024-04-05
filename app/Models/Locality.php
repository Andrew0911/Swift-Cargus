<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Locality extends Model
{
    protected $table = 'localities';
    protected $primaryKey = 'LocalityId';
    public $timestamps = false;
}

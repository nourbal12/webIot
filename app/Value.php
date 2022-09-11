<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    protected $fillable=['mid', 'valeur', 'created_at'];
    protected $primaryKey='vid';
    protected $table='values';
    public $timestamps= false;
}

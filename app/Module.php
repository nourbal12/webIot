<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable=['description','nom', 'unite', 'valMin', 'valMax'];
    protected $primaryKey='mid';
    protected $table='modules';
    public $timestamps= false;



}
?>

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('values', function (Blueprint $table) {
            $table->increments('vid');
            $table->float('valeur');
            $table->timestamp('Created_at')->nullable();
            $table->integer('mid')->unsigned();
            $table->foreign('mid')->references('mid')->on('modules')->onDelete('cascade');
        }); // //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('values',function(Blueprint $table){
            $table->dropForeign(['mid']);
        });  //
    }
}

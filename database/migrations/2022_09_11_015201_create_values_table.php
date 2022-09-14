<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
            $table->timestamp('Created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
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

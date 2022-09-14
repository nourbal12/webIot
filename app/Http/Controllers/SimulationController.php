<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ModuleRequest;
use App\Module;
use App\Value;

class SimulationController extends Controller
{
    
    public function simulate($mid)
    {
        while(true) {
            $module = Module::where('mid', $mid)->get();
            DB::table('values')->insert([
                'mid' => $mid,
                'valeur' => rand($module['valMin']-30, $module['valMax']+30),
                'Created_at' => time(),
            ]);

            sleep(1);
        }
    }
}
<?php

namespace App\Http\Controllers;
use App\Module;
use App\Http\Requests\ValueRequest;
use App\Value;
use Illuminate\Support\Facades\DB;


class ValueController extends Controller
{
    

    public function __construct( ) {
        
        
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $values = Value::all();
        $this->simulate();

        return $values->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ValueRequest $request)
    {
        $value = Value::create($request->all());
        return $value->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $vid
     * @return \Illuminate\Http\Response
     */
    public function show($vid)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $mid
     * @return \Illuminate\Http\Response
     */
    public function edit(Value $value)
    {
        return $value->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $vid
     * @return \Illuminate\Http\Response
     */
    public function update($valueId)
    {
        $data = (array) json_decode(file_get_contents("php://input"));
        $value= Value::where('mid', $valueId)->update($data);

        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $mid
     * @return \Illuminate\Http\Response
     */
    public function destroy(Value $value)
    {
        $value->delete();

        return response()->json('Delete successful!');
    }

    public function simulate()
    {   
        $modules = Module::all();
        $moduleLength=count($modules);
        $mid=rand(1,$moduleLength);
        $module=Module::where('mid',$mid)->get()->first();
        $i = 10;
        while($i >= 0) {
            DB::table('values')->insert([
                'mid' => $mid,
                'valeur' => rand($module['valMin'],$module['valMax'])
            ]);
            $i = $i-1;
          
        }
    }

    public function getValuesByMid($id){
        
       return Value::where('mid', $id)->get();
    }
}
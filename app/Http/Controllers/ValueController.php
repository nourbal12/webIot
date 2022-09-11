<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValueRequest;
use App\Value;

class ValueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $values = Value::all();

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
}
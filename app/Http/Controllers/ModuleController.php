<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Module;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $modules = Module::all();

        return $modules->toJson();
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
    public function store(ModuleRequest $request)
    {
        $module = Module::create($request->all());

        return $module->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $mid
     * @return \Illuminate\Http\Response
     */
    public function show($mid)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $mid
     * @return \Illuminate\Http\Response
     */
    public function edit(Module $module)
    {
        return $module->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $mid
     * @return \Illuminate\Http\Response
     */
    public function update($moduleId)
    {
        $data = (array) json_decode(file_get_contents("php://input"));
        $module = Module::where('mid', $moduleId)->update($data);

        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $mid
     * @return \Illuminate\Http\Response
     */
    public function destroy(Module $module)
    {
        $module->delete();

        return response()->json('Delete successful!');
    }
}
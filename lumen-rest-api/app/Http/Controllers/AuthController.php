<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    //
    public function index(Request $request){
        return User::all();
    }
    public function login(Request $request){
        $email = $request->email;
        $password = $request->password;
        if(empty($email) OR empty($password)){
            return response()->json(['status'=>'error','message'=>'You must fill all fields']);
        }
         
        try{
            
            $client = new \GuzzleHttp\Client();
            return  $client->post(config('service.passport.login_endpoint'),[
                "form_params" => [
                    "client_secret" => config('service.passport.client_secret'),
                    "grant_type" => "password",
                    "client_id" => config('service.passport.client_id'),
                    "username" =>  $request->email,
                    "password" =>  $request->password
                ]
            ]);

        }catch(BadResponseException $e){
            return response()->json(['status'=>'error','message'=>$e->getMessage()]);
        }
    }
    //
    public function register(Request $request){
        $email = $request->email;
        $password = $request->password;
        $name = $request->name;
        
        //check fields are empty or not
        if(empty($email) OR empty($password) OR empty($name)){
            return response()->json(['status'=>'error','message'=>'You must fill all fields']);
        }

        //check emial is valid 
        if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
            return response()->json(['status'=>'error','message'=>'You must enter a valid email']);
        }

        // Check if password is greater than 5 charecter
        if(strlen($password) < 6){
            return response()->json(['status'=>'error','message'=>'Password should be of min 6 charecters']);
        }

        // Check if user already
        if(User::where('email','=',$email)->exists()){
            return response()->json(['status'=>'error','message'=>'Email is already exists.']);
        }
        try{
            
            $user = new User();
            $user->name = $name;
            $user->email = $email;
            $user->password = app('hash')->make($password);
            if($user->save()){
                return $this->login($request);
                //return 'user created successfully!!';
            }

        }catch(\Exception $e){
            return response()->json(['status'=>'error','message'=>$e->getMessage()]);
        }
    }

    public function logout(Request $request){
        try{
            auth()->user()->tokens()->each(function($token){
                $token->delete();
            });
            return response()->json(['status'=>'successs','message'=>'Logged out Successfully']);   
        }catch(\Exception $e){
            return response()->json(['status'=>'error','message'=>$e->getMessage()]);
        }
    }
}

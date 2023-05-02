<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    // public function handle($request, Closure $next)
    // {
    //     return $next($request)
    //         ->header('Access-Control-Allow-Origin', '*')
    //         ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    //         ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // }
    
    public function handle($request, Closure $next)
{
    $response = $next($request);

    $response->header('Access-Control-Allow-Origin', 'http://localhost:19006');
    $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return $response;
}

}
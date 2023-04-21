<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\RestoRequest;
use App\Models\Reservation;

class RestaurantController extends Controller
{
    function addRestaurant(Request $request){
        $manager = auth()->user();

        if(!$manager) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
        $request->validate(['name' => 'unique:restaurants']);
      
        $restaurant = new Restaurant;
        $restaurant->name = $request->name;
        $restaurant->logo = $request->logo;
        $restaurant->location = $request->location;
        $restaurant->number_of_tables = $request->number_of_tables;
        $restaurant->manager_id = $manager->id;
        $restaurant->save();

        $menu = new Menu;
        $menu->restaurant_id = $restaurant->id;
        $menu->save();

        $restaurant->menu_id = $menu->id;
        $restaurant->save();

        $restoRequest= new RestoRequest;
        $restoRequest->restaurant_id = $restaurant->id;
        $restoRequest->save();

        return response()->json(['status' => 'success', 'message' => $restaurant->id]);
        }
        return redirect()->back()->withInput()->withErrors(['name'=>'name taken']);
    }

    function addMenuItem(Request $request){
        $manager = auth()->user();

        if(!$manager) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {       
            $request->validate(['name' => 'unique:menu_items']);
  
            $restaurant = Restaurant::where('manager_id', $manager->id)->first();
            $menu_id = $restaurant->menu_id;

            $menuItem = new MenuItem;

            $menuItem->menu_id = $menu_id;
            $menuItem->name = $request->name;
            $menuItem->description = $request->description;
            $menuItem->price = $request->price;
            $menuItem->category = $request->category;

            $menuItem->save();

            return response()->json(['status' => 'success', 'message' => $menuItem]);
        }
        return redirect()->back()->withInput()->withErrors(['name'=>'name taken']);
    }

    // function deleteMenuItem($menu_item_id){
    //     $manager = auth()->user();

    //     if(!$manager) return response()->json(['error' => 'Unauthorized'], 401);
    //     else
    //     {         
    //         $menu_item = MenuItem::find($menu_item_id);
            
    //         $menu_item->delete();

    //         return response()->json(['status' => 'success', 'message' => 'menu item deleted']);
    //     }
    //     return redirect()->back()->withInput()->withErrors(['name'=>'name taken']);
    // }

    function getReservations($restaurant_id)
    {
        $manager = auth()->user();

        if(!$manager) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $reservations = Reservation::where('restaurant_id', $restaurant_id)->get();
            
            return response()->json(['reservations' => $reservations]);
        }
    }

    function updateRestaurant(Request $request)
    {
        $manager = auth()->user();

        if(!$manager) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $restaurant = Restaurant::where('manager_id', $manager->id)->first();

            Restaurant::find($restaurant->id)->update(['logo' => $request->logo, 'location' => $request->location, 'number_of_tables' => $request->number_of_tables]);

            $restaurant = Restaurant::where('manager_id', $manager->id)->first();

            return response()->json(['status'=>'success', 'message'=>'restaurant updated', 'restaurant'=>$restaurant]);

        }

    }
}

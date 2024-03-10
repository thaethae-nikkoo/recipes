<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
    *
    * Get all categories
    * GET - /api/categories

    *
    */
    public function index()
    {
        try {
            return  Category::all(); // default pagination method support 15 data
        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }
    }
}

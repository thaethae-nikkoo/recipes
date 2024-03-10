<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RecipeController extends Controller
{
    /**
     *
     * Get all recipes and filter by category
     * GET - /api/recipes
     * @param category - optional
     *
     */
    public function index()
    {
        try {
            return  Recipe::filter(request(['category']))->with('category:id,name')->latest()->paginate(6); // default pagination method support 15 data
        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }
    }
    /**
    *
    * Store a recipe
    * POST - /api/recipes
    * @param title,description,category_id,photo_url(need to call upload api),
    *
    */
    public function store()
    {
        try {
            $validator = Validator::make(request()->all(), [
                'title'  => 'required',
                'description' => 'required',
                'category_id' => ['required' , Rule::exists('categories', 'id')],
                'photo' => 'required',
            ]);

            if($validator->fails()) {
                $flatteredErrors = collect($validator->errors())->flatMap(function ($e, $field) {
                    return [$field => $e[0]];
                });

                return response()->json([
                    'errors' => $flatteredErrors,
                    'status' => 400,
                ], 400);
            }

            $recipe = new Recipe();
            $recipe->title = request('title');
            $recipe->description = request('description');
            $recipe->category_id = request('category_id');
            $recipe->photo = request('photo');
            $recipe->save();
            return response($recipe, 201);

        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }
    }

    /**
    *
    * Upload a photo
    * POST - /api/recipes/upload
    * @param photo
    *
    */
    public function upload()
    {

        try {
            $validator = Validator::make(request()->all(), [
                'photo' => ['required' ,'image'],
             ]);

            if($validator->fails()) {

                $flatteredErrors = collect($validator->errors())->flatMap(function ($e, $field) {
                    return [$field => $e[0]];
                });
                return response()->json([
                    'errors' => $flatteredErrors,
                    'status' => 400,
                ], 400);
            }

            $file_name = time().'-'.str_replace(' ', '-', request('photo')->getClientOriginalName());

            $path =  request('photo')->storeAs('/recipes', $file_name);
            return [
             'path' => "/storage/".$path,
             'status' => 200
            ];

        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }
    }

    /**
    *
    * Delete old photo when edit
    * POST - /recipes/photoUpdate/:id
    * @param photo
    *
    */

    public function photoUpdate($id)
    {
        try {

            $result = Recipe::select('photo')->where('id', $id)->first("photo");

            $path = str_replace('/storage', '', parse_url($result->photo, PHP_URL_PATH));

            if (Storage::disk('public')->exists($path)) {
                // Delete the file
                Storage::disk('public')->delete($path);
            }

            $file_name = time().'-'.str_replace(' ', '-', request('photo')->getClientOriginalName());

            $path =  request('photo')->storeAs('/recipes', $file_name);

            return [
                        'path' => "/storage/".$path,
                        'status' => 200
                    ];

        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }
    }
    /**
     *
     * Get a recipe with related id
     * GET - /api/recipes/:id
     * @param id
     *
     */
    public function show($id)
    {
        try {
            $recipe = Recipe::find($id);
            if(!$recipe) {
                return response()->json([
                    'message' => "Recipe Not Found.",
                    'status' => 404,
                ], 404);
            }

            return $recipe;

        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }
    }

    /**
    *
    * Update a recipe
    * PATCH - /api/recipes
    * @param title,description,category_id,photo_url(need to call upload api),
    *
    */
    public function update($id)
    {
        try {
            $recipe = Recipe::find($id);
            if(!$recipe) {
                return response()->json([
                    'message' => "Recipe Not Found.",
                    'status' => 404,
                ], 404);
            }

            $validator = Validator::make(request()->all(), [
                'title'  => 'required',
                'description' => 'required',
                'category_id' => ['required' , Rule::exists('categories', 'id')],
            ]);

            if($validator->fails()) {

                $flatteredErrors = collect($validator->errors())->flatMap(function ($e, $field) {
                    return [$field => $e[0]];
                });
                return response()->json([
                    'errors' => $flatteredErrors,
                    'status' => 400,
                ], 400);
            }

            $recipe->title = request('title');
            $recipe->description = request('description');
            $recipe->category_id = request('category_id');

            if(request('photo')) {

                $recipe->photo = request('photo');
            }

            $recipe->save();

            return response($recipe, 201);

        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }
    }
    /**
    *
    * Delete a recipe with related id
    * DELETE - /api/recipes/:id
    * @param id
    *
    */

    public function destroy($id)
    {


        try {
            $result = Recipe::select('photo')->where('id', $id)->first("photo");

            $path = str_replace('/storage', '', parse_url($result->photo, PHP_URL_PATH));

            if (Storage::disk('public')->exists($path)) {
                // Delete the file
                Storage::disk('public')->delete($path);
            }

            $recipe = Recipe::find($id);
            if(!$recipe) {
                return response()->json([
                    'message' => "Recipe Not Found.",
                    'status' => 404,
                ], 404);
            }

            $recipe->delete();
            return $recipe;

        } catch(Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500,
            ], 500);

        }

    }
}

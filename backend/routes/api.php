<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecipeController;

use Illuminate\Support\Facades\Route;

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/recipes', [RecipeController::class, 'index']);
Route::post('/recipes', [RecipeController::class, 'store']);
Route::get('/recipes/{recipe}', [RecipeController::class, 'show']);
Route::patch('/recipes/{recipe}', [RecipeController::class, 'update']);
Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy']);
Route::post('/recipes/upload', [RecipeController::class, 'upload']);

Route::post('/recipes/photoUpdate/{recipe}', [RecipeController::class, 'photoUpdate']);

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Recipe extends Model
{
    use HasFactory;
    protected $guarded =[];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeFilter($query, $filters)
    {

        if(isset($filters['category'])) {
            $query->whereHas('category', function ($catQuery) use ($filters) {
                $catQuery->where('name', $filters['category']);
            });
        }
    }

    protected function photo(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => env('APP_URL').($value),
        );
    }


}

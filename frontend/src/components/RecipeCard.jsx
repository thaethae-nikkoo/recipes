/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <>
      <Link to={`/recipe/${recipe.id}`}>
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg active:shadow-none transition-all duration-500">
          <img
            className="h-[300px] mb-4 rounded-t-lg w-full object-cover"
            src={recipe.photo}
            alt="product image"
          />
          <div className="px-5 pb-5">
            <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {recipe.title}
            </h5>
            <p className="line-clamp-2 mt-2 text-gray-500">
              {recipe.description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

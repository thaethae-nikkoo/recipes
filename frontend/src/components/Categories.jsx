/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
export default function Categories({ setRecipes }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    }
    getCategories();
  }, []);

  let filterRecipeByCategory = async (category) => {
    try {
      if (category !== "all") {
        let { data: recipes } = await axios.get(
          "/api/recipes?category=" + category
        );
        if (recipes) {
          setRecipes(recipes.data);
        }
      } else {
        let { data: recipes } = await axios.get("/api/recipes");
        if (recipes) {
          setRecipes(recipes.data);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };
  return (
    <>
      <div className="hidden justify-center md:flex ">
        <nav className="bg-red-400 text-white grid grid-flow-col text-center mt-14">
          <div
            onClick={() => filterRecipeByCategory("all")}
            className="cursor-pointer hover:bg-white hover:text-red-400 transition-all duration-500 w-[120px] p-3 active"
          >
            All recipes
          </div>
          {!!categories &&
            categories.map((category) => (
              <div
                onClick={() => filterRecipeByCategory(category.name)}
                key={category.id}
                className="cursor-pointer hover:bg-white hover:text-red-400 transition-all duration-500 w-[120px] p-3"
              >
                {category.name}
              </div>
            ))}
        </nav>
      </div>
      <div className=" flex justify-center mt-11  md:hidden">
        <select
          className="appearance-none bg-red-400 text-white outline-none border-none p-3 w-[300px] text-center"
          name=""
          id=""
        >
          <option value="all">All Recipes</option>

          {!!categories &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}

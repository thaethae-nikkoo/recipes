import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import Pagination from "../components/Pagination";
export default function Home() {
  const [recipes, setRecipes] = useState([]);
  let [loading, setLoading] = useState(true);
  let [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    async function getRecipes() {
      try {
        const res = await axios.get(`/api/recipes?page=${currentPage}`);
        setRecipes(res.data.data);
        setLinks(res.data.links);
        setPageCount(res.data.last_page);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    getRecipes();
  }, [currentPage]);

  // if (recipes.length == 0) {
  //   return (
  //     <p className="text-red-600 text-center mt-[900px]">No recipes found...</p>
  //   );
  // }

  return (
    <>
      <main className="xl:px-[80px] md:px-[50px] px-[20px]">
        <h1 className="text-center mt-11 text-5xl font-bold text-gray-800 leading-tight">
          All your favorite
          <span className="font-bold text-red-400">recipes,</span>
          <span className="font-bold text-red-400">in one place</span>
        </h1>

        <Categories setRecipes={setRecipes} />

        {loading && (
          <div className="animate-pulse my-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="w-full border border-gray-300 shadow bg-gray-500 rounded-lg hover:shadow-lg active:shadow-none transition-all duration-500"
              >
                <div
                  className="h-[300px] mb-4 rounded-t-lg w-full object-cover"
                  alt="product image"
                ></div>
                <div className="grid px-5 mb-4 grid-cols-3 gap-4">
                  <div className="h-[9px] border border-gray-300 bg-gray-300 rounded-xl col-span-2"></div>
                  <div className="h-[9px] border border-gray-300 bg-gray-300 rounded-xl col-span-1"></div>
                </div>

                <div className="px-5 pb-5">
                  <div className=" h-[9px] mt-1 border border-gray-300 bg-gray-300 rounded "></div>
                  <div className="line-clamp-2 rounded-xl h-[7px] border border-gray-300 mt-2 bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && recipes.length == 0 && (
          <p className="text-red-400 text-center mt-9">No recipes found...</p>
        )}

        {!loading && (
          <div className="my-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
            {!!recipes &&
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        )}

        {!loading && !!links && (
          <Pagination setCurrentPage={setCurrentPage} pageCount={pageCount} />
        )}
      </main>
    </>
  );
}

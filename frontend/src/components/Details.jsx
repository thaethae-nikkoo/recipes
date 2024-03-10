import { useEffect, useState } from "react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Details() {
  let param = useParams();
  let id = param.id;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function getRecipe() {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
    getRecipe();
  }, [id]);

  return (
    <>
      {!!recipe && (
        <main className="flex gap-5 items-center md:flex-row flex-col xl:px-[80px] md:px-[50px] px-[20px] my-11">
          <img
            className="max-h-[400px]"
            src={recipe.photo}
            alt="product image"
          />
          <div className="space-y-5">
            <h5 className="text-4xl font-semibold tracking-tight text-gray-900 ">
              {recipe.title}
            </h5>
            <p className="text-gray-500">{recipe.description} </p>
            <div className="flex gap-4 border-t py-5 justify-end">
              <EditBtn id={recipe.id} />
              <DeleteBtn id={recipe.id} />
            </div>
          </div>
        </main>
      )}
    </>
  );
}

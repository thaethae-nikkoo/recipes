import axios from "axios";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function DeleteBtn({ id }) {
  let navigate = useNavigate();
  let deleteRecipe = async () => {
    let response = await axios.delete("api/recipes/" + id);
    if (response) {
      navigate("/home");
    }
  };
  return (
    <>
      <button
        onClick={() => deleteRecipe(id)}
        className="bg-red-500 text-white px-3 py-2 rounded-lg"
      >
        Delete
      </button>
    </>
  );
}

import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function RecipeForm() {
  const [categories, setCategories] = useState([]);
  let [category, setCategory] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  let [validationError, setValidationError] = useState(null);
  let [error, setError] = useState("");
  let [file, setFile] = useState(null);
  let [isEdit, setIsEdit] = useState(false);
  let [oldImage, setOldImage] = useState(null);

  let [preview, setPreview] = useState("");

  let navigate = useNavigate();

  let para = useParams();
  let id = para.id;

  async function getRecipe() {
    try {
      const res = await axios.get(`/api/recipes/${id}`);
      let rec = res.data;
      setTitle(rec.title);
      setDescription(rec.description);
      setCategory(rec.category_id);
      setPreview(rec.photo);
      setOldImage(rec.photo);
    } catch (error) {
      console.log("Error fetching recipes:", error.message);
    }
  }

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      getRecipe();
    }
    async function getCategories() {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (error) {
        setError("Error fetching categories:", error);
      }
    }
    getCategories();
  }, [id]);

  let handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  let handlePreviewImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  let createData = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await axios.post("/api/recipes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let photo_url = response.data.path;

      let res = await axios.post(
        "/api/recipes",
        {
          title,
          description,
          category_id: category,
          photo: photo_url,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (res) {
        setMessage("Success!");
        setTitle("");
        setDescription("");
        setCategories("");
        setFile(null);
        setPreview("");
      }

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Validation errors occurred

        const errors = error.response.data.errors;
        setValidationError(errors);
      } else {
        setError(error.message);
      }
    }
  };

  let updateData = async () => {
    const url = new URL(oldImage);
    let path = url.pathname;

    let res = await axios.patch(
      "/api/recipes/" + id,
      {
        title,
        description,
        category_id: category,
        photo: path,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (res) {
      setMessage("Success!");
      setTitle("");
      setDescription("");
      setCategories("");
      setPreview("");
    }

    if (file) {
      // /recipes/photoUpdate/:id
      const formData = new FormData();
      formData.append("photo", file);

      const response = await axios.post(
        "/api/recipes/photoUpdate/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      let photo_url = response.data.path;

      let result = await axios.patch(
        "/api/recipes/" + id,
        {
          title,
          description,
          category_id: category,
          photo: photo_url,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (result) {
        setFile(null);
      }
    }

    navigate("/recipe/" + id);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdit) {
      await createData();
    } else {
      await updateData();
    }
  };

  useEffect(() => {
    if (file) {
      handlePreviewImage(file);
    }
  }, [file]);

  return (
    <>
      <Aside />
      <div className="p-4 sm:ml-64 pt-[20px] h-[100vh]">
        <h1 className="text-3xl font-bold border-b pb-4">Recipe</h1>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="max-w-[700px] mx-auto mt-[100px] shadow-md p-8 rounded-lg space-y-5"
        >
          {!!message && <p className="text-green-500">{message}</p>}
          {!!error && <p className="text-red-500">{error}</p>}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Chicken Curry..."
            />
            {!!validationError && !!validationError.title && (
              <span className="text-red-500 text-xs ml-2 tracking-wider">
                {validationError.title}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
            ></textarea>
            {!!validationError && !!validationError.description && (
              <span className="text-red-500 text-xs ml-2 tracking-wider">
                {validationError.description}
              </span>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>

            <select
              className="border w-full p-2 rounded-xl border-gray-400 shadow"
              name="category_id"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id=""
            >
              <option value=""> -- Choose --</option>
              {!!categories &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>

            {!!validationError && !!validationError.category_id && (
              <span className="text-red-500 text-xs ml-2 tracking-wider">
                {validationError.category_id}
              </span>
            )}
          </div>
          <input
            type="file"
            className="block my-8"
            name="photo"
            onChange={handlePhotoChange}
          />
          {/* <!-- added image will show here --> */}
          {!!preview && (
            <div>
              <img
                className="h-[300px] w-full object-cover"
                src={preview}
                alt=""
              />
            </div>
          )}

          <button
            type="submit"
            name="submit"
            className="block w-full hover:text-white hover:bg-red-400 transition-all duration-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-red-400 text-red-400"
          >
            Done
          </button>
        </form>
      </div>
    </>
  );
}

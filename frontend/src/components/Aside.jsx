import { Link } from "react-router-dom";

export default function Aside() {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="/"
              className="flex items-center text-2xl   font-bold p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              My Recipe
            </a>
          </li>
          {/* <!-- <li>
          <a href="dashboard.php" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span className="ms-3">Dashboard</span>
          </a>
        </li> --> */}
          <li>
            <Link
              to="/"
              className="bg-gray-400 text-black flex items-center w-full p-2 text-base transition duration-75 rounded-lg group"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <img
                className="w-[25px]"
                src="https://cdn3.iconfinder.com/data/icons/feather-5/24/home-512.png"
                alt=""
              />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Go Frontend
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/add/recipe"
              className="bg-gray-400 text-black flex items-center w-full p-2 text-base transition duration-75 rounded-lg group"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <img
                className="w-[25px]"
                src="https://cdn2.iconfinder.com/data/icons/picnic-outline/64/FOOD_RECIPE-recipe-ingredients-ingredient-education-recipes-orange-books-cooking-256.png"
                alt=""
              />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Recipe Form
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

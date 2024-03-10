import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav className="flex justify-between items-center h-[80px] border-b xl:px-[80px] md:px-[50px] px-[20px]">
        <div>
          <Link to="/" className="text-3xl text-green-400 font-semibold">
            My Recipe
          </Link>
        </div>
        <div>
          <Link
            to="/recipe/add"
            className="px-3 py-3 rounded-lg bg-red-400 hover:opacity-[0.85] transition-all duration-500 text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <div>Add Recipe</div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

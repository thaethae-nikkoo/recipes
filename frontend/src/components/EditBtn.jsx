/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function EditBtn({ id }) {
  return (
    <>
      <Link
        to={"/recipe/edit/" + id}
        className="bg-blue-400 text-white px-4 py-2 rounded-lg"
      >
        Edit
      </Link>
    </>
  );
}

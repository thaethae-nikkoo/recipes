/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";
// import { useEffect, useState } from "react";
// import axios from "axios";

export default function Pagination({ setCurrentPage, pageCount }) {
  let handlePageChange = async ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel={<span className="mx-4 ">...</span>}
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center ">
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        }
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center ">
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        }
        containerClassName="flex items-center justify-center mt-8"
        renderOnZeroPageCount={null}
        activeClassName="bg-red-400"
        pageClassName="block  hover:border-solid hover:border-gray-200 hover:bg-gray-200 w-10 h-10 flex items-center justify-center "
      />
    </div>
  );
}

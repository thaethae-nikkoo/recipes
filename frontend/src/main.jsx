import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeForm from "./pages/RecipeForm";

axios.defaults.baseURL = "http://localhost:8000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/recipe/:id",
    element: <RecipeDetails />,
  },
  {
    path: "/recipe/add",
    element: <RecipeForm />,
  },
  {
    path: "/recipe/edit/:id",
    element: <RecipeForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

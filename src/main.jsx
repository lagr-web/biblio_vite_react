import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import { getAllGenreData, getGenreBySlug, getAllBookData } from "./data.js";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/Books.jsx";
import Books from "./pages/Books.jsx";
import { Admin } from "./pages/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          return await getAllGenreData();
        },
        HydrateFallback: () => <div>Henter alle genre...</div>,

        action: async ({ request }) => {
          const formData = await request.formData();

          try {
            const res = await fetch(`${API_URL}/addbook`, {
              method: "POST",
              body: formData, // Sender automatisk som multipart/form-data
            });

            if (!res.ok) {
              return { error: "Kunne ikke oprette bogen på backenden" };
            }

            if (res.ok) {
              console.log("Bogen blev oprettet med succes!");
              e.target.reset();

              // Tvinger browseren til at genindlæse siden med det samme.
              // Når siden genindlæses, kører din router-loader automatisk forfra!
              window.location.reload();
            }

            // Returner succes. React Router vil nu automatisk køre loaderen igen!
            return { success: true };
          } catch (error) {
            return { error: "Netværksfejl under oprettelse" };
          }
        },
      },
      {
        // Ændret fra /about/:slug til /genre/:slug
        path: "/genre/:slug",
        element: <Books />,
        loader: async ({ params }) => {
          return await getGenreBySlug(params.slug);
        },
        HydrateFallback: () => <div>Henter bøger ud fra slugs...</div>,
      },

      {
        path: "/admin",
        element: <Admin />,
        loader: async ({ params }) => {
          return await getAllBookData();
        },
        HydrateFallback: () => <div>Henter bøger ud fra slugs...</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

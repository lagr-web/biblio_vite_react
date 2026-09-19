// src/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Importer komponenter og sider
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Books from "../pages/Books.jsx";
import { Admin } from "../pages/Admin.jsx";

// Importer dine eksterne loaders/actions
import { adminLoader, adminAction } from "../routes/adminRoutes.js";
import { getAllGenreData, getGenreBySlug } from "../data.js";

// ✅ Eksporter selve router-konfigurationen
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        id: "root",
        element: <Home />,
        loader: async () => await getAllGenreData(),
        HydrateFallback: () => <div>Henter alle genre...</div>,
      },
      {
        path: "/genre/:slug",
        element: <Books />,
        loader: async ({ params }) => await getGenreBySlug(params.slug),
        HydrateFallback: () => <div>Henter bøger ud fra slugs...</div>,
      },
      {
        path: "/admin",
        element: <Admin />,
        loader: adminLoader,
        action: adminAction,
        HydrateFallback: () => <div>Åbner admin-panelet...</div>,
      },
    ],
  },
]);

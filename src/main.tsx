import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import ErrorPage from "./pages/ErrorPage.tsx";
import Nav from "./components/Nav.tsx";
import BasketProvider from "./context/BasketContext.tsx";
import UserPage from "./pages/UserPage.tsx";
import HeroPage from "./pages/HeroPage.tsx";
import "@mantine/carousel/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/my",
        element: <UserPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <BasketProvider>
        <RouterProvider router={router} />
      </BasketProvider>
    </MantineProvider>
  </React.StrictMode>
);

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import ErrorPage from "./pages/ErrorPage.tsx";
import Nav from "./components/Nav.tsx";
import App from "./App.tsx";
import BasketProvider from "./context/BasketContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "/",
        element: <App />,
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

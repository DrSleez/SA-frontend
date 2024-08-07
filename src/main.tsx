import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import ErrorPage from "./pages/ErrorPage.tsx";
import Nav from "./components/Nav.tsx";
import UserPage from "./pages/UserPage.tsx";
import HeroPage from "./pages/HeroPage.tsx";
import "@mantine/carousel/styles.css";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";
import AllPlantsPage from "./pages/AllPlantsPage.tsx";
import GardenPlantsPage from "./pages/GardenPlantsPage.tsx";
import RoomPlantsPage from "./pages/RoomPlantsPage.tsx";
import HedgePlantsPage from "./pages/HedgePlantsPage.tsx";
import TreesPage from "./pages/TreesPage.tsx";
import PlantDetailsPage from "./pages/PlantDetailsPage/PlantDetailsPage.tsx";
import { Provider } from "react-redux";
import { store as reduxStore, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import SearchPlantPage from "./pages/SearchPlantPage.tsx";
import SuccessPage from "./pages/SuccessPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import CancelPage from "./pages/CancelPage.tsx";
import NewPlant from "./pages/NewPlant.tsx";

const queryClient = new QueryClient();

const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post("/refresh", param, {
        headers: { Authorization: `Bearer ${param.authToken}` },
      });
      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
  refresh: refresh,
});

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
        path: "/plant/:id",
        element: <PlantDetailsPage />,
      },
      {
        path: "/search/:search",
        element: <SearchPlantPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/cancel",
        element: <CancelPage />,
      },
      {
        path: "/all",
        element: <AllPlantsPage />,
      },
      {
        path: "/gartenpflanzen",
        element: <GardenPlantsPage />,
      },
      {
        path: "/zimmerpflanzen",
        element: <RoomPlantsPage />,
      },
      {
        path: "/heckenpflanzen",
        element: <HedgePlantsPage />,
      },
      {
        path: "/baeume",
        element: <TreesPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/my",
    element: <Nav />,
    children: [
      {
        path: "/my",
        element: <AuthOutlet fallbackPath="/login" />,
        children: [
          {
            path: "/my/",
            element: <UserPage />,
          },
          {
            path: "/my/orders",
            element: <OrdersPage />,
          },
          {
            path: "/my/newPlant",
            element: <NewPlant />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxStore}>
        <AuthProvider store={store}>
          <PersistGate persistor={persistor}>
            <MantineProvider>
              <RouterProvider router={router} />
            </MantineProvider>
          </PersistGate>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

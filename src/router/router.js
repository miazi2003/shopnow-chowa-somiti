import { createBrowserRouter } from "react-router";
import MainLayOut from "../layouts/MainLayOut";
import Home from "../pages/home/Home";
import Service from "../pages/service/Service";
import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      { index: true, Component: Home },
      { path: "service", Component: Service },
      {path : "dashboard" , Component : Dashboard}
    ],
  },
]);

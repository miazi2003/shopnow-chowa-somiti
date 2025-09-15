import { createBrowserRouter } from "react-router";
import MainLayOut from "../layouts/MainLayOut";
import Home from "../pages/home/Home";
import Service from "../pages/service/Service";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/authentication/Login";
import SignUpPage from "../pages/authentication/SignIn";
import MemberDepositForm from "../component/Deposit/DepositForm";
import MemberSignupPage from "../pages/authentication/SignIn";
import AllMember from "../pages/all member/AllMember";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      { index: true, Component: Home },
      { path: "service", Component: Service },
      { path: "/login", Component: LoginPage },
      {path : "/memberDetails" , element: <PrivateRouter><AllMember></AllMember></PrivateRouter>}
    ],
  },

  {
    path: "dashboardLayout",
    Component: DashboardLayout,
    children: [
      { path: "dashboard",  element : <PrivateRouter><Dashboard></Dashboard></PrivateRouter> },
      { path: "deposit", element : <PrivateRouter><MemberDepositForm></MemberDepositForm></PrivateRouter> },
      {path : "signIn" , element : <PrivateRouter><MemberSignupPage></MemberSignupPage></PrivateRouter>}
    ],
  },
]);

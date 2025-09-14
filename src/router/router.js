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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      { index: true, Component: Home },
      { path: "service", Component: Service },
      { path: "/login", Component: LoginPage },
      {path : "/memberDetails" , Component : AllMember}
    ],
  },

  {
    path: "dashboardLayout",
    Component: DashboardLayout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "deposit", Component: MemberDepositForm },
      {path : "signIn" , Component : MemberSignupPage}
    ],
  },
]);

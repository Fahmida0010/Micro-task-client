import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import AddTask from "../pages/Dashboard/Buyer/AddTask";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <BuyerHome /> },
      { path: "my-tasks", element: <MyTasks /> },
      { path: "add-task", element: <AddTask /> },
      { path: "purchase-coin", element: <PurchaseCoin /> },
      { path: "payment-history", element: <PaymentHistory /> },
    ],
  },
]);

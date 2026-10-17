import { createBrowserRouter, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider"; 
import axiosSecure from "../hooks/useAxiosSecure";

import BasicLayout from "../layouts/BasicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Buyer Components
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import AddTask from "../pages/Dashboard/Buyer/AddTask";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";
import UpdateTask from "../pages/Dashboard/Buyer/UpdateTask";

// Worker Components
import WorkerHome from "../pages/Dashboard/worker/WorkerHome";
import TaskList from "../pages/Dashboard/worker/TaskList";
import MySubmissions from "../pages/Dashboard/worker/MySubmissions";
import Withdrawals from "../pages/Dashboard/worker/Withdrawals";
import TaskDetails from "../pages/Dashboard/worker/TaskDetails";

// Admin Components
import AdminHome from "../pages/Dashboard/admin/AdminHome";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import ManageTasks from "../pages/Dashboard/admin/ManageTasks";

// Shared & Protection Routes
import BuyerRoute from "./BuyerRoutes";
import WorkerRoute from "./WorkerRoutes";
import AdminRoute from "./AdminRoutes";
import NotFound from "../pages/NotFound/NotFound";

// Payment & Common Pages
import PaymentSuccess from "../pages/payment/payment-success";
import PaymentFailed from "../pages/payment/payment-failed";
import Profile from "../pages/Dashboard/Profile/profile";
import Settings from "../pages/Dashboard/Settings/Settings";

const DashboardRedirect = () => {
  const { user: authUser, loading: authLoading } = useAuth();

  const { data: dbUser, isLoading: dbLoading } = useQuery({
    queryKey: ["userRole", authUser?.email],
    enabled: !authLoading && !!authUser?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${authUser.email}`);
      return res.data;
    },
  });

  if (authLoading || dbLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!authUser) return <Navigate to="/login" replace />;

  const role = dbUser?.role?.toLowerCase(); 

  if (role === "worker") return <Navigate to="/dashboard/worker-home" replace />;
  if (role === "buyer") return <Navigate to="/dashboard/buyer-home" replace />;
  if (role === "admin") return <Navigate to="/dashboard/admin-home" replace />;

  return <Navigate to="/" replace />;
};

// --- Router Configuration ---
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
      {
        index: true,
        element: <DashboardRedirect />,
      },
      
      // Shared Common Routes (Accessible by all roles inside Dashboard)
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },

      // Payment Result Routes
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-failed",
        element: <PaymentFailed />,
      },

      // Buyer Routes
      {
        path: "buyer-home",
        element: <BuyerRoute><BuyerHome /></BuyerRoute>,
      },
      {
        path: "my-tasks",
        element: <BuyerRoute><MyTasks /></BuyerRoute>,
      },
      {
        path: "updatetask/:id",
        element: <BuyerRoute><UpdateTask /></BuyerRoute>,
      },
      {
        path: "add-task",
        element: <BuyerRoute><AddTask /></BuyerRoute>,
      },
      {
        path: "purchase-coin",
        element: <BuyerRoute><PurchaseCoin /></BuyerRoute>,
      },
      {
        path: "payment-history",
        element: <BuyerRoute><PaymentHistory /></BuyerRoute>,
      },

      // Worker Routes
      {
        path: "worker-home",
        element: <WorkerRoute><WorkerHome /></WorkerRoute>,
      },
      {
        path: "task-list",
        element: <WorkerRoute><TaskList /></WorkerRoute>,
      },
      {
        path: "task-details/:id",
        element: <WorkerRoute><TaskDetails /></WorkerRoute>,
      },
      {
        path: "my-submissions",
        element: <WorkerRoute><MySubmissions /></WorkerRoute>,
      },
      {
        path: "withdrawals",
        element: <WorkerRoute><Withdrawals /></WorkerRoute>,
      },

      // Admin Routes
      {
        path: "admin-home",
        element: <AdminRoute><AdminHome /></AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "manage-tasks",
        element: <AdminRoute><ManageTasks /></AdminRoute>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useAuth } from "../context/AuthProvider"; 

// import BasicLayout from "../layouts/BasicLayout";
// import DashboardLayout from "../layouts/DashboardLayout";

// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome";
// import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
// import AddTask from "../pages/Dashboard/Buyer/AddTask";
// import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin";
// import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";
// import WorkerHome from "../pages/Dashboard/worker/WorkerHome";
// import TaskList from "../pages/Dashboard/worker/TaskList";
// import MySubmissions from "../pages/Dashboard/worker/MySubmissions";
// import Withdrawals from "../pages/Dashboard/worker/Withdrawals";
// import BuyerRoute from "./BuyerRoutes";
// import WorkerRoute from "./WorkerRoutes";
// import axiosSecure from "../hooks/useAxiosSecure";


// // DashboardRedirect এর ভেতর queryFn
// queryFn: async () => {
//   const res = await axiosSecure.get(`/users/${authUser.email}`);
//   return res.data;
// },

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <BasicLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//     ],
//   },
//   {
//     path: "dashboard",
//     element: <DashboardLayout />,
//     children: [
//       {
//         index: true,
//         element: <DashboardRedirect />,
//       },
//       {
//         path: "buyer-home",
//         element: <BuyerRoute><BuyerHome /></BuyerRoute>,
//       },
//       {
//         path: "my-tasks",
//         element: <BuyerRoute><MyTasks /></BuyerRoute>,
//       },
//       {
//         path: "add-task",
//         element: <BuyerRoute><AddTask /></BuyerRoute>,
//       },
//       {
//         path: "purchase-coin",
//         element: <BuyerRoute><PurchaseCoin /></BuyerRoute>,
//       },
//       {
//         path: "payment-history",
//         element: <BuyerRoute><PaymentHistory /></BuyerRoute>,
//       },
//       {
//         path: "worker-home",
//         element: <WorkerRoute><WorkerHome /></WorkerRoute>,
//       },
//       {
//         path: "task-list",
//         element: <WorkerRoute><TaskList /></WorkerRoute>,
//       },
//       {
//         path: "my-submissions",
//         element: <WorkerRoute><MySubmissions /></WorkerRoute>,
//       },
//       {
//         path: "withdrawals",
//         element: <WorkerRoute><Withdrawals /></WorkerRoute>,
//       },
//     ],
//   },
// ]);


import { createBrowserRouter, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider"; 
import axiosSecure from "../hooks/useAxiosSecure";

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
import WorkerHome from "../pages/Dashboard/worker/WorkerHome";
import TaskList from "../pages/Dashboard/worker/TaskList";
import MySubmissions from "../pages/Dashboard/worker/MySubmissions";
import Withdrawals from "../pages/Dashboard/worker/Withdrawals";

import BuyerRoute from "./BuyerRoutes";
import WorkerRoute from "./WorkerRoutes";
import AdminHome from "../pages/Dashboard/admin/AdminHome";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import ManageTasks from "../pages/Dashboard/admin/ManageTasks";

// --- DashboardRedirect Component ---
const DashboardRedirect = () => {
  const { user: authUser, loading: authLoading } = useAuth();

  const { data: dbUser, isLoading: dbLoading } = useQuery({
    queryKey: ["userRole", authUser?.email],
    enabled: !authLoading && !!authUser?.email, 
    queryFn: async () => {
      // এখানে axios এর বদলে axiosSecure ব্যবহার করা হয়েছে
      const res = await axiosSecure.get(`/users/${authUser.email}`);
      return res.data;
    },
  });

  if (authLoading || dbLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!authUser) return <Navigate to="/login" replace />;

  const role = dbUser?.role?.toLowerCase(); // Case-sensitivity এড়াতে toLowerCase()

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
        path: "my-submissions",
        element: <WorkerRoute><MySubmissions /></WorkerRoute>,
      },
      {
        path: "withdrawals",
        element: <WorkerRoute><Withdrawals /></WorkerRoute>,
      },
      //admin route
    {
      path: "admin-home",
      element: 
        <AdminRoute>
          <AdminHome/>
        </AdminRoute>
      },
    {
      path: "manage-users",
      element:
        <AdminRoute>
          <ManageUsers />
        </AdminRoute>
      
    },
    {
      path: "manage-tasks",
      element: 
        <AdminRoute>
          <ManageTasks/>
        </AdminRoute>
    }
    
    ],
  },
]);
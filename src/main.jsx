
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";


// TanStack Query Imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from "./routes/AppRoutes";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ১. প্রথমে QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      {/* ২. তারপর AuthProvider */}
      <AuthProvider>
        {/* ৩. সবশেষে RouterProvider */}
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaHome, FaTasks, FaPlusCircle, FaCoins, FaHistory, FaUsers, FaUserShield } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthProvider";
import axiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loader/Loading";


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user from DB
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // 🚦 Redirect logic inside layout
  useEffect(() => {
    if (loading || isLoading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    const role = dbUser?.role;
    if (location.pathname === "/dashboard") {
      if (role === "worker") navigate("/dashboard/worker-home", { replace: true });
      if (role === "buyer") navigate("/dashboard/buyer-home", { replace: true });
      if (role === "admin") navigate("/dashboard/admin-home", { replace: true });
    }
  }, [user, loading, isLoading, dbUser, location.pathname, navigate]);

  if (loading || isLoading) {
    return <Loading/>
  }
  if (!user) return null;

  const role = dbUser?.role;

  // --- Menu arrays with icons ---
  const buyerMenu = [
    { label: "Home", path: "/dashboard/buyer-home", icon: <FaHome /> },
    { label: "Add Task", path: "/dashboard/add-task", icon: <FaPlusCircle /> },
    { label: "My Tasks", path: "/dashboard/my-tasks", icon: <FaTasks /> },
    { label: "Purchase Coin", path: "/dashboard/purchase-coin", icon: <FaCoins /> },
    { label: "Payment History", path: "/dashboard/payment-history", icon: <FaHistory /> },
  ];

  const workerMenu = [
    { label: "Home", path: "/dashboard/worker-home", icon: <FaHome /> },
    { label: "Task List", path: "/dashboard/task-list", icon: <FaTasks /> },
    { label: "My Submissions", path: "/dashboard/my-submissions", icon: <FaHistory /> },
    { label: "Withdrawals", path: "/dashboard/withdrawals", icon: <FaCoins /> },
  ];

  const adminMenu = [
    { label: "Home", path: "/dashboard/admin-home", icon: <FaHome /> },
    { label: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
    { label: "Manage Tasks", path: "/dashboard/manage-tasks", icon: <FaUserShield /> },
  ];

  let menuItems = [];
  if (role === "worker") menuItems = workerMenu;
  if (role === "buyer") menuItems = buyerMenu;
  if (role === "admin") menuItems = adminMenu;

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-indigo-600 text-white transition-all p-4`}>

          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="mb-6 p-2 hover:bg-indigo-700 rounded"
          >
            {sidebarOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>

          <nav className="space-y-2">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-3 rounded hover:bg-indigo-700 transition"
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

        </aside>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>

      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;

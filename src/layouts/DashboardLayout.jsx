import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { 
  FaHome, 
  FaTasks, 
  FaPlusCircle, 
  FaCoins, 
  FaHistory, 
  FaUsers, 
  FaUserShield, 
  FaUserEdit, 
  FaCog 
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthProvider";
import axiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loader/Loading";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile drawer automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Redirect logic inside layout
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
    return <Loading />;
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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1 pt-16 relative">
        
        {/* Mobile & Tablet Toggle Bar (Visible on small screens) */}
        <div className="lg:hidden w-full  px-4 py-3 flex justify-between items-center fixed top-16 left-0 right-0 z-30 ">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg transition"
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
            <span className="font-semibold  text-sm sm:text-base capitalize">
              Dashboard 
            </span>
          </div>
        </div>

        {/* Backdrop Overlay for Mobile Drawer */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Container */}
        <aside 
          className={`
            fixed lg:static top-16 lg:top-0 bottom-0 left-0 z-50 lg:z-10
            bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out
            flex flex-col p-4
            ${mobileMenuOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
            ${sidebarOpen ? "lg:w-64" : "lg:w-20"}
          `}
        >
          <div>
            {/* Desktop Sidebar Collapse Button */}
            <div className="hidden lg:flex justify-between items-center mb-6 px-1">
              {sidebarOpen && (
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {role} Panel
                </span>
              )}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
              >
                {sidebarOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5 mt-10 lg:mt-0">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3.5 p-3 rounded-xl font-medium transition text-sm sm:text-base ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none" 
                        : "hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className={`${!sidebarOpen && "lg:hidden"} truncate`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              <hr className="my-3 border-gray-100 dark:border-gray-800" />

              {/* Profile Link */}
              <Link
                to="/dashboard/profile"
                className={`flex items-center gap-3.5 p-3 rounded-xl font-medium transition text-sm sm:text-base ${
                  location.pathname === "/dashboard/profile"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                    : "hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <span className="text-xl flex-shrink-0"><FaUserEdit /></span>
                <span className={`${!sidebarOpen && "lg:hidden"} truncate`}>Profile</span>
              </Link>

              {/* Settings Link */}
              <Link
                to="/dashboard/settings"
                className={`flex items-center gap-3.5 p-3 rounded-xl font-medium transition text-sm sm:text-base ${
                  location.pathname === "/dashboard/settings"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                    : "hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <span className="text-xl flex-shrink-0"><FaCog /></span>
                <span className={`${!sidebarOpen && "lg:hidden"} truncate`}>Settings</span>
              </Link>
            </nav>
          </div>

          {/* Go Back Home Link at Bottom */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
            <Link
              to="/"
              className="flex items-center gap-3.5 p-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-sm sm:text-base"
            >
              <span className="text-xl flex-shrink-0"><FaArrowLeftLong /></span>
              <span className={`${!sidebarOpen && "lg:hidden"} truncate`}>Go Back Home</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-12 lg:mt-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

     
    </div>
  );
};

export default DashboardLayout;
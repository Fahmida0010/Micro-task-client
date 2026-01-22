import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Add New Tasks", path: "/dashboard/add-task" },
    { label: "My Tasks", path: "/dashboard/my-tasks" },
    { label: "Purchase Coin", path: "/dashboard/purchase-coin" },
    { label: "Payment History", path: "/dashboard/payment-history" },
  ];

  return (
    <>
      <Navbar />
      <div className="flex min-h-[80vh]">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-indigo-600 text-white transition-all duration-300 p-4`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-6 p-2 hover:bg-indigo-700 rounded"
          >
            {sidebarOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block p-3 rounded hover:bg-indigo-700 transition"
                title={!sidebarOpen ? item.label : ""}
              >
                {sidebarOpen ? item.label : item.label.charAt(0)}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;

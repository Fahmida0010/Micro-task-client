import { useEffect, useState } from "react";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaCoins, FaWallet } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 🌟 Custom Skeleton Loader for Admin Home Page
const AdminHomeSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen animate-pulse transition-colors duration-300">
      {/* Title Skeleton */}
      <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-lg w-56 mb-8 mt-10"></div>

      {/* Stats Cards Skeleton (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4"
          >
            <div className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0"></div>
            <div className="space-y-2 w-full">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          <div className="h-80 bg-gray-100 dark:bg-gray-800/50 rounded-xl w-full"></div>
        </div>

        {/* Pie Chart Skeleton */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          <div className="h-80 flex justify-center items-center">
            <div className="w-52 h-52 rounded-full border-8 border-gray-200 dark:border-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminHome = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/admin-stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin stats fetch error:", err);
        setLoading(false);
      });
  }, []);

  const statCards = [
    { title: "Total Workers", value: stats.workers || 0, icon: <FaUsers />, color: "bg-blue-500" },
    { title: "Total Buyers", value: stats.buyers || 0, icon: <FaUsers />, color: "bg-green-500" },
    { title: "Total Coins", value: stats.totalCoin || 0, icon: <FaCoins />, color: "bg-yellow-500" },
    { title: "Total Payments", value: `$${stats.totalPayments || 0}`, icon: <FaWallet />, color: "bg-purple-500" },
  ];

  // Bar Chart Data
  const chartData = [
    { name: "Workers", count: stats.workers || 0 },
    { name: "Buyers", count: stats.buyers || 0 },
    { name: "Coins", count: stats.totalCoin || 0 },
    { name: "Payments ($)", count: stats.totalPayments || 0 },
  ];

  // Pie Chart Data (User Distribution)
  const userDistributionData = [
    { name: "Workers", value: stats.workers || 0 },
    { name: "Buyers", value: stats.buyers || 0 },
  ];

  const COLORS = ["#3B82F6", "#10B981"];

  if (loading) {
    return <AdminHomeSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 mt-10">
        Admin Dashboard
      </h2>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4 hover:shadow-md transition-shadow"
          >
            <div className={`${card.color} p-4 rounded-lg text-white text-2xl flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overview Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Platform Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#374151',
                    borderRadius: '0.75rem',
                    color: '#FFF' 
                  }} 
                />
                <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Ratio Pie Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 self-start">User Ratio</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#374151',
                    borderRadius: '0.75rem',
                    color: '#FFF' 
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
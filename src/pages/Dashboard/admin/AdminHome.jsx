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

const AdminHome = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/admin-stats").then((res) => {
      setStats(res.data);
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 mt-10">Admin Dashboard</h2>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`${card.color} p-4 rounded-lg text-white text-2xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overview Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Platform Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Ratio Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-800 mb-6 self-start">User Ratio</h3>
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
                <Tooltip />
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
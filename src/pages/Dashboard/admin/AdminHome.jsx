"use client";

import { useEffect, useState } from "react";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaCoins, FaWallet, FaCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHome = () => {
  const [stats, setStats] = useState({});
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    // fetch stats
    axiosSecure.get("/admin-stats").then((res) => setStats(res.data));

    // fetch withdraw requests
    axiosSecure.get("/withdraw-requests").then((res) => setWithdraws(res.data));
  }, []);

  
  // const handleApprove = async (id, email, coin) => {
  //   try {
  //     await axiosSecure.patch(`/withdraw-approve/${id}`, { email, coin });

  //     // update withdraws state, change status to approved
  //     setWithdraws((prev) =>
  //       prev.map((w) =>
  //         w._id === id ? { ...w, status: "approved" } : w
  //       )
  //     );

  //     toast.success("Withdrawal approved successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Approval failed");
  //   }
  // };

const handleApprove = async (id) => {
  try {
    await axiosSecure.patch(`/withdraw-approve/${id}`);

    setWithdraws((prev) =>
      prev.map((w) =>
        w._id === id ? { ...w, status: "approved" } : w
      )
    );

    toast.success("Withdrawal approved successfully!");
  } catch (err) {
    console.error(err.response?.data);
    toast.error("Approval failed");
  }
};

  const statCards = [
    { title: "Total Workers", value: stats.workers || 0, icon: <FaUsers />, color: "bg-blue-500" },
    { title: "Total Buyers", value: stats.buyers || 0, icon: <FaUsers />, color: "bg-green-500" },
    { title: "Total Coins", value: stats.totalCoin || 0, icon: <FaCoins />, color: "bg-yellow-500" },
    { title: "Total Payments", value: `$${stats.totalPayments || 0}`, icon: <FaWallet />, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
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

      {/* Withdrawal Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Withdraw Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Worker Name</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {withdraws.length > 0 ? (
                withdraws.map((w) => (
                  <tr key={w._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-700">{w.worker_name}</td>
                    <td className="px-6 py-4 text-green-600 font-bold">${w.withdrawal_amount}</td>
                    <td className="px-6 py-4 text-center">
                      {w.status === "pending" ? (
                        <button
                          onClick={() => handleApprove(w._id, w.worker_email, w.withdrawal_coin)}
                          className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all shadow-md active:scale-95"
                        >
                          <FaCheckCircle className="mr-2" /> Approve Payment
                        </button>
                      ) : (
                        <span className="text-blue-600 font-semibold">{w.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
                    No pending withdraw requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
import { useEffect, useState } from "react";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawRequests = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/withdraw-requests").then((res) => {
      setWithdraws(res.data);
      setLoading(false);
    });
  }, []);

  const handleApprove = async (id, email, coin) => {
    try {
      await axiosSecure.patch(`/withdraw-approve/${id}`, { email, coin });

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="mt-10 mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Withdrawal Requests</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full">
          Total Requests: {withdraws.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {w.status}
                        </span>
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

export default WithdrawRequests;
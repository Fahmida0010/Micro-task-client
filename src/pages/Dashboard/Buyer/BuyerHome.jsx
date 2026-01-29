// src/pages/dashboard/buyer/BuyerHome.jsx
import { useEffect, useState } from "react";
import axiosSecure from "../../../hooks/useAxiosSecure"; // JWT সহ axios
import { toast } from "react-hot-toast";

const BuyerHome = () => {
  const [stats, setStats] = useState({});
  const [subs, setSubs] = useState([]);

  // fetch stats
  const fetchStats = async () => {
    try {
      const res = await axiosSecure.get("/buyer/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to load stats");
    }
  };

  // fetch pending submissions
  const fetchPendingSubs = async () => {
    try {
      const res = await axiosSecure.get("/submissions/pending");
      setSubs(res.data);
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to load pending submissions");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchPendingSubs();
  }, []);

  // Approve submission
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/submissions/approve/${id}`);
      toast.success("Submission approved!");
      // update pending submissions
      fetchPendingSubs();
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to approve submission");
    }
  };

  // Reject submission
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/submissions/reject/${id}`);
      toast.success("Submission rejected!");
      fetchPendingSubs();
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to reject submission");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <p className="text-gray-100 mb-2">Total Tasks</p>
          <h3 className="text-4xl font-bold">{stats.totalTasks || 0}</h3>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
          <p className="text-gray-100 mb-2">Pending Workers</p>
          <h3 className="text-4xl font-bold">{stats.pendingWorkers || 0}</h3>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <p className="text-gray-100 mb-2">Total Paid</p>
          <h3 className="text-4xl font-bold">${stats.totalPaid || 0}</h3>
        </div>
      </div>

      {/* Task Review */}
      <div className="bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold p-6 border-b">Pending Task Reviews</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Worker</th>
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-left">Pay</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {subs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No pending reviews
                  </td>
                </tr>
              ) : (
                subs.map((s) => (
                  <tr key={s._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{s.worker_name}</td>
                    <td className="p-3">{s.task_title}</td>
                    <td className="p-3">${s.payable_amount}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleApprove(s._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(s._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;

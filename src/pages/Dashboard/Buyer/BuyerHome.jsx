import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import axiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { FaClipboardList, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const BuyerHome = () => {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingWorkers: 0,
    totalPaid: 0,
  });
  const [submissions, setSubmissions] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchStats = async (email) => {
    try {
      const res = await axiosSecure.get(`/buyer/stats/${email}`);
      console.log("Stats fresh data:", res.data); 
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch error:", err);
      toast.error("Failed to load stats");
    }
  };

  const fetchSubmissions = async (email) => {
    setTableLoading(true);
    try {
      const res = await axiosSecure.get(`/submissions/buyer/${email}`);
      console.log("Submissions fresh data:", res.data); // debug
      setSubmissions(res.data);
    } catch (err) {
      console.error("Submissions fetch error:", err);
      toast.error("Failed to load submissions");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    if (loading || !user?.email) return;

    const email = user.email;
    fetchStats(email);
    fetchSubmissions(email); 
  }, [loading, user?.email]);

  const handleAction = async (id, action) => {
    const actionText = action === "approve" ? "Approve" : "Reject";

    const result = await Swal.fire({
      title: `Are you sure you want to ${actionText.toLowerCase()} this submission?`,
      text: "This action cannot be undone later!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: `Yes, ${actionText} it!`,
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const endpoint = action === "approve" 
        ? `/submissions/approve/${id}` 
        : `/submissions/reject/${id}`;

      const res = await axiosSecure.patch(endpoint);
      console.log(`${actionText} response:`, res.data); // debug

      // Success toast
      toast.success(`Submission ${actionText.toLowerCase()}d successfully!`);

      // Success SweetAlert popup
      await Swal.fire({
        title: "Success!",
        text: `The submission has been ${actionText.toLowerCase()}d.`,
        icon: "success",
        confirmButtonColor: "#10B981",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });

      // Refresh both stats and submissions
      await Promise.all([fetchStats(user.email), fetchSubmissions(user.email)]);
    } catch (err) {
      console.error(`${actionText} error:`, err.response?.data || err);

      // Error toast
      toast.error(`Failed to ${actionText.toLowerCase()} submission`);

      // Error SweetAlert
      await Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-950 dark:to-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-6 lg:p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 mt-8 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 animate-pulse">
          Welcome to Your Buyer Dashboard, {user?.displayName || "Buyer"}!
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-blue-200 dark:border-gray-800">
            <div className="flex justify-center mb-4"><FaClipboardList className="text-5xl text-blue-600 dark:text-blue-400" /></div>
            <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Total Tasks</p>
            <h3 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 animate-bounce">{stats.totalTasks}</h3>
          </div>

          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-yellow-200 dark:border-gray-800">
            <div className="flex justify-center mb-4"><FaUsers className="text-5xl text-yellow-600 dark:text-yellow-400" /></div>
            <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Pending Workers</p>
            <h3 className="text-4xl md:text-5xl font-bold text-yellow-600 dark:text-yellow-400 animate-bounce">{stats.pendingWorkers}</h3>
          </div>

          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-green-200 dark:border-gray-800">
            <div className="flex justify-center mb-4"><FaMoneyBillWave className="text-5xl text-green-600 dark:text-green-400" /></div>
            <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Total Paid</p>
            <h3 className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 animate-bounce">${stats.totalPaid}</h3>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <FaClipboardList className="text-blue-600 dark:text-blue-400" /> Task Submissions
          </h3>

          {tableLoading ? (
            <div className="flex justify-center py-10">
              <FaSpinner className="animate-spin text-4xl text-blue-600 dark:text-blue-400" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400 italic flex items-center justify-center gap-2">
              <FaTimesCircle className="text-xl" /> No submissions yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-sm md:text-base text-gray-800 dark:text-gray-200">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 md:p-4 text-left">Worker</th>
                    <th className="p-3 md:p-4 text-left">Task</th>
                    <th className="p-3 md:p-4 text-left">Pay</th>
                    <th className="p-3 md:p-4 text-left">Status</th>
                    <th className="p-3 md:p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => (
                    <tr key={s._id} className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-3 md:p-4">{s.worker_name}</td>
                      <td className="p-3 md:p-4">{s.task_title}</td>
                      <td className="p-3 md:p-4">${s.payable_amount}</td>
                      <td className="p-3 md:p-4">
                        <span
                          className={`badge badge-lg font-semibold px-4 py-2 ${
                            s.status === "approved"
                              ? "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
                              : s.status === "rejected"
                              ? "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
                              : "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                          }`}
                        >
                          {s.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 md:p-4">
                        {s.status === "pending" && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAction(s._id, "approve")}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
                            >
                              <FaCheckCircle /> Approve
                            </button>
                            <button
                              onClick={() => handleAction(s._id, "reject")}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
                            >
                              <FaTimesCircle /> Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
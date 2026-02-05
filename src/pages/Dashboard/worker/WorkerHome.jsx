import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { FaTasks, FaHourglassHalf, FaDollarSign, FaCheckCircle } from "react-icons/fa"; // ← Added icons for uniqueness

const WorkerHome = () => {
  const { user, loading } = useAuth();

  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalPending: 0,
    totalEarning: 0,
    approvedSubmissions: [],
  });

  useEffect(() => {
    if (loading || !user?.email) return;

    const workerEmail = user.email;

    axiosSecure
      .get(`/worker-stats/${workerEmail}`)
      .then((res) => {
        console.log("Backend থেকে পাওয়া ডাটা:", res.data);

        setStats({
          totalSubmissions: res.data.totalSubmissions || 0,
          totalPending: res.data.totalPending || 0,
          totalEarning: res.data.totalEarning || 0,
          approvedSubmissions: res.data.approvedSubmissions || [],
        });
      })
      .catch((err) => {
        console.error("Worker stats err:", err);
      });
  }, [user?.email, loading]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8
        mt-8 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 animate-pulse">
          Welcome to Your Worker Dashboard, {user?.displayName || "Worker"}!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-blue-200">
            <div className="flex justify-center mb-4">
              <FaTasks className="text-5xl text-blue-600" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Submissions</h2>
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mt-2 animate-bounce">
              {stats.totalSubmissions}
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-yellow-200">
            <div className="flex justify-center mb-4">
              <FaHourglassHalf className="text-5xl text-yellow-600" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Pending Tasks</h2>
            <p className="text-4xl md:text-5xl font-bold text-yellow-600 mt-2 animate-bounce">
              {stats.totalPending}
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-green-200">
            <div className="flex justify-center mb-4">
              <FaDollarSign className="text-5xl text-green-600" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Earnings</h2>
            <p className="text-4xl md:text-5xl font-bold text-green-600 mt-2 animate-bounce">
              ${stats.totalEarning}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaCheckCircle className="text-green-600" /> Approved Submissions
          </h2>

          {stats.approvedSubmissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 md:p-4">Task Title</th>
                    <th className="p-3 md:p-4">Pay</th>
                    <th className="p-3 md:p-4">Buyer</th>
                    <th className="p-3 md:p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.approvedSubmissions.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 md:p-4">{sub.task_title}</td>
                      <td className="p-3 md:p-4">${sub.payable_amount}</td>
                      <td className="p-3 md:p-4">{sub.Buyer_name}</td>
                      <td className="p-3 md:p-4">
                        <span className="badge badge-success badge-lg">{sub.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-8 flex items-center justify-center gap-2">
              <FaCheckCircle className="text-xl" /> There is no approved submission yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
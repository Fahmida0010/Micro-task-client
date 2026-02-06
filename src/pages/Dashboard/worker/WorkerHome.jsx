import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { FaTasks, FaHourglassHalf, FaDollarSign, FaCheckCircle } from "react-icons/fa";

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
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 mt-8 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 animate-pulse">
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

        {/* ──────────────────────────────────────────────── */}
        {/* Only this part is changed – Approved Submissions */}
        {/* ──────────────────────────────────────────────── */}

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaCheckCircle className="text-green-600" /> Approved Submissions
          </h2>

          {stats.approvedSubmissions.length > 0 ? (
            <>
              {/* Desktop / Tablet Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left font-semibold rounded-tl-xl">
                        Task Title
                      </th>
                      <th scope="col" className="px-6 py-4 text-center font-semibold">
                        Pay
                      </th>
                      <th scope="col" className="px-6 py-4 text-center font-semibold">
                        Buyer
                      </th>
                      <th scope="col" className="px-6 py-4 text-center font-semibold rounded-tr-xl">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {stats.approvedSubmissions.map((sub, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-green-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-5 whitespace-nowrap font-medium text-gray-900">
                          {sub.task_title}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-center">
                          <span className="text-xl font-bold text-green-700">
                            ${sub.payable_amount}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-center text-gray-700">
                          {sub.Buyer_name}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-center">
                          <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                            {sub.status || "Approved"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-5">
                {stats.approvedSubmissions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="font-semibold text-gray-900 mb-3 text-lg">
                      {sub.task_title}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-500">Pay</div>
                        <div className="text-xl font-bold text-green-700">
                          ${sub.payable_amount}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Buyer</div>
                        <div className="font-medium text-gray-800">{sub.Buyer_name}</div>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        {sub.status || "Approved"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FaCheckCircle className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-lg">There is no approved submission yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
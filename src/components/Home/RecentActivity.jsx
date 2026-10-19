import { useEffect, useState } from "react";
import { FaCheckCircle, FaDollarSign, FaUser, FaEnvelope } from "react-icons/fa";
import axios from "axios";

// 🌟 Skeleton Loader for Approved Submissions Page
const ApprovedSubmissionsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4 shadow-sm"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ApprovedSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  axios.get(`${import.meta.env.VITE_API_URL}/submissions/approved`)
      .then((res) => {
        setSubmissions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching approved submissions:", err);
        setLoading(false);
      });
  }, []);

  // Shudhu matro latest 4 ta submission slice kore nilam
  const latestSubmissions = submissions.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300 w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 mt-10 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaCheckCircle className="text-green-500" /> Latest Approved Submissions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            List of the 4 most recently verified and paid worker tasks.
          </p>
        </div>
        <div className="bg-green-600 dark:bg-green-500 text-white px-5 py-2 rounded-xl shadow-md font-semibold text-center sm:text-left text-sm sm:text-base">
          Total Approved: {submissions.length}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <ApprovedSubmissionsSkeleton />
      ) : latestSubmissions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestSubmissions.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <FaCheckCircle size={12} /> Approved
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {item.approvedAt
                      ? new Date(item.approvedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-3 line-clamp-2">
                  {item.task_title || "Task Submission"}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <p className="flex items-center gap-2 font-medium">
                    <FaUser className="text-indigo-500 dark:text-indigo-400 text-xs flex-shrink-0" />
                    <span className="truncate">Worker: {item.worker_name || "Unknown"}</span>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                    <FaEnvelope className="text-indigo-400 dark:text-indigo-500 text-xs flex-shrink-0" />
                    <span>{item.worker_email}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  Reward
                </span>
                <div className="flex items-center gap-1 text-base font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50 px-3 py-1 rounded-xl">
                  <FaDollarSign size={14} />
                  <span>{item.payable_amount || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800">
          <FaCheckCircle size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
            No approved submissions found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovedSubmissions;
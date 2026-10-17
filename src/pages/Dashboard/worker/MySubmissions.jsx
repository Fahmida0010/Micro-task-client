import { useEffect, useState } from "react";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../../context/AuthProvider";

const MySubmissions = () => {
  const [subs, setSubs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(5); 
  const { user } = useAuth();

  const fetchSubmissions = (page) => {
    axiosSecure
      .get(`/my-submissions/${user?.email}?page=${page}&limit=${limit}`)
      .then((res) => {
        setSubs(res.data.submissions);
        setPages(res.data.pages);
      })
      .catch(() => toast.error("Failed to load submissions"));
  };

  useEffect(() => {
    if (user?.email) fetchSubmissions(page);
  }, [user, page]);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Toaster position="top-right" />
      <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-6 text-gray-800 dark:text-gray-100">My Submissions</h2>

      {subs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16 text-lg">No submissions yet.</p>
      ) : (
        <div>
          {/* Desktop/Tablet View: Table Method */}
          <div className="hidden md:block overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-4 text-left font-semibold">Task</th>
                  <th className="p-4 text-left font-semibold">Pay</th>
                  <th className="p-4 text-left font-semibold">Buyer</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {subs.map((sub) => (
                  <tr
                    key={sub._id}
                    className={`transition-colors duration-150 ${
                      sub.status === "pending"
                        ? "bg-yellow-50/60 dark:bg-yellow-950/20 hover:bg-yellow-100/60 dark:hover:bg-yellow-950/40"
                        : sub.status === "approved"
                        ? "bg-green-50/60 dark:bg-green-950/20 hover:bg-green-100/60 dark:hover:bg-green-950/40"
                        : "bg-red-50/60 dark:bg-red-950/20 hover:bg-red-100/60 dark:hover:bg-red-950/40"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{sub.task_title}</td>
                    <td className="p-4 text-green-600 dark:text-green-400 font-semibold">${sub.payable_amount}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{sub.Buyer_name}</td>
                    <td className="p-4 font-semibold capitalize">
                      <span className={`inline-px px-3 py-1 rounded-full text-xs uppercase font-bold ${
                        sub.status === "pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300"
                          : sub.status === "approved"
                          ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                      {new Date(sub.current_date || sub.date || sub.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View: Card Method */}
          <div className="md:hidden space-y-4">
            {subs.map((sub) => (
              <div
                key={sub._id}
                className={`p-4 rounded-xl shadow-sm border transition-colors ${
                  sub.status === "pending"
                    ? "bg-yellow-50/80 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900/50"
                    : sub.status === "approved"
                    ? "bg-green-50/80 dark:bg-green-950/30 border-green-200 dark:border-green-900/50"
                    : "bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-900/50"
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">{sub.task_title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs uppercase font-bold whitespace-nowrap ${
                    sub.status === "pending"
                      ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300"
                      : sub.status === "approved"
                      ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs block">Pay</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">${sub.payable_amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs block">Buyer</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{sub.Buyer_name}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200/60 dark:border-gray-800">
                  {new Date(sub.current_date || sub.date || sub.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 cursor-pointer text-sm"
            >
              Prev
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                  page === i + 1 
                    ? "bg-indigo-600 text-white dark:bg-indigo-500" 
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
              className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 cursor-pointer text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
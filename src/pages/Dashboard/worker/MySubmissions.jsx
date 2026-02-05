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
    <div className="p-4">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-800">My Submissions</h2>

      {subs.length === 0 ? (
        <p className="text-center text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border p-3 text-left">Task</th>
                <th className="border p-3 text-left">Pay</th>
                <th className="border p-3 text-left">Buyer</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub) => (
                <tr
                  key={sub._id}
                  className={
                    sub.status === "pending"
                      ? "bg-yellow-100"
                      : sub.status === "approved"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }
                >
                  <td className="border p-3 font-medium">{sub.task_title}</td>
                  <td className="border p-3 text-green-600 font-semibold">${sub.payable_amount}</td>
                  <td className="border p-3">{sub.Buyer_name}</td>
                  <td className="border p-3 font-semibold capitalize">{sub.status}</td>
                  <td className="border p-3 text-gray-600">
                    {new Date(sub.current_date || sub.date || sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded hover:bg-gray-300 ${
                  page === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
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

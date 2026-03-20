import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await axiosSecure.get("/tasks/my");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete task?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.delete(`/tasks/${id}`);

    if (res.data.success) {
      Swal.fire("Deleted!", "", "success");
      loadTasks();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8 md:mt-12 text-gray-800">
        My Tasks
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full min-w-[900px] divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800 tracking-wide">
                Task Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-800 tracking-wide">
                Date 
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-800 tracking-wide">
                Workers
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-800 tracking-wide">
                Pay
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-800 tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-indigo-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 line-clamp-2 max-w-xs">
                      {task.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {formatDate(task.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 font-semibold text-indigo-700">
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      {task.required_workers}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 font-bold text-yellow-700">
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 13a1 1 0 11-2 0 1 1 0 012 0zm.5-9a3.5 3.5 0 013.5 3.5c0 .827-.224 1.604-.612 2.264l-.388.776-.776.388A3.49 3.49 0 0111.5 13.5a3.5 3.5 0 01-3.5-3.5c0-1.93 1.57-3.5 3.5-3.5z" />
                      </svg>
                      {task.payable_amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/updateTask/${task._id}`}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition shadow-sm hover:shadow-md"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition shadow-sm hover:shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CARDS - Tablet & Mobile (below lg) ================= */}
      <div className="lg:hidden grid gap-5 sm:grid-cols-2">
        {tasks.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 text-lg">
            No tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
                <h3 className="text-white font-semibold line-clamp-2">
                  {task.title}
                </h3>
                <p className="text-indigo-100 text-sm mt-1">
                  {formatDate(task.createdAt)}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="font-medium text-gray-800">
                      {task.required_workers} Workers
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 13a1 1 0 11-2 0 1 1 0 012 0zm.5-9a3.5 3.5 0 013.5 3.5c0 .827-.224 1.604-.612 2.264l-.388.776-.776.388A3.49 3.49 0 0111.5 13.5a3.5 3.5 0 01-3.5-3.5c0-1.93 1.57-3.5 3.5-3.5z" />
                    </svg>
                    <span className="font-bold text-yellow-700 text-lg">
                      {task.payable_amount}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <Link
                    to={`/dashboard/updateTask/${task._id}`}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-lg font-medium transition shadow-sm"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-medium transition shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTasks;
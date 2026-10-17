import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks/my");
      setTasks(res.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete task?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/tasks/${id}`);
      if (res.data.success) {
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
        loadTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire("Error!", "Failed to delete task.", "error");
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
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-4 md:mt-8 text-gray-800 dark:text-gray-100">
        My Tasks
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 mb-8">
        <table className="w-full min-w-[900px] divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800/60">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Task Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Workers
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Pay
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 max-w-xs">
                      {task.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
                    {formatDate(task.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                      <svg
                        className="w-4 h-4"
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
                    <div className="inline-flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 13a1 1 0 11-2 0 1 1 0 012 0zm.5-9a3.5 3.5 0 013.5 3.5c0 .827-.224 1.604-.612 2.264l-.388.776-.776.388A3.49 3.49 0 0111.5 13.5a3.5 3.5 0 01-3.5-3.5c0-1.93 1.57-3.5 3.5-3.5z" />
                      </svg>
                      ${task.payable_amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/dashboard/updateTask/${task._id}`}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition shadow-sm"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition shadow-sm"
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
      <div className="lg:hidden grid gap-4 sm:grid-cols-2">
        {tasks.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 text-base">
            No tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base line-clamp-2">
                    {task.title}
                  </h3>
                  <span className="font-bold text-amber-600 dark:text-amber-400 text-sm whitespace-nowrap">
                    ${task.payable_amount}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {formatDate(task.createdAt)}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <svg
                    className="w-4 h-4"
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
                  {task.required_workers} Workers
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/updateTask/${task._id}`}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition"
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
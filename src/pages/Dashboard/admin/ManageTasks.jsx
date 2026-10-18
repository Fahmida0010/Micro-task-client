import { useEffect, useState } from "react";
import { FaTrashAlt, FaTasks, FaUsers, FaDollarSign, FaUser, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosSecure from "../../../hooks/useAxiosSecure";

// 🌟 Custom Skeleton Loader for ManageTasks Page
const ManageTasksSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Mobile Card Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4"
          >
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-full mb-4"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex justify-between items-center gap-4 py-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/6"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/5"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/managetasks")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Manage tasks fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/tasks/${email}`)
          .then(() => {
            setTasks(tasks.filter((task) => task.Buyer_email !== email));
            Swal.fire("Deleted!", "The task has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err.response?.data || err);
            Swal.fire(
              "Error",
              err.response?.data?.message || "Delete failed",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 mt-14 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaTasks className="text-indigo-600 dark:text-indigo-400" /> Manage Tasks
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Review and manage all posted tasks from buyers.
          </p>
        </div>
        <div className="bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-2 rounded-xl shadow-md font-semibold text-center sm:text-left text-sm sm:text-base">
          Total Tasks: {tasks.length}
        </div>
      </div>

      {/* Condition 1: Skeleton Loading UI */}
      {loading ? (
        <ManageTasksSkeleton />
      ) : tasks.length > 0 ? (
        <>
          {/* 📱 Mobile & Tablet View: CARD METHOD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {tasks.map((task) => (
              <div 
                key={task.Buyer_email} 
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between gap-4 relative hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-bold text-pink-700 dark:text-pink-400 text-base sm:text-lg mb-2 line-clamp-2">
                    {task.title}
                  </h3>
                  <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200">
                      <FaUser className="text-indigo-500 dark:text-indigo-400 text-xs" /> {task.Buyer_name}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                      <FaEnvelope className="text-indigo-400 dark:text-indigo-500 text-xs flex-shrink-0" /> {task.Buyer_email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">
                      <FaUsers className="text-indigo-500 dark:text-indigo-400" />
                      <span>Req: {task.required_workers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50 px-2.5 py-1 rounded-lg">
                      <FaDollarSign size={12} />
                      <span>{task.payable_amount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(task.Buyer_email)}
                    className="bg-red-50 dark:bg-red-950/50 text-red-500 dark:text-red-400 p-2.5 rounded-xl hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-all shadow-sm cursor-pointer"
                    title="Delete Task"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 Desktop View: TABLE METHOD */}
          <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">Task Title</th>
                    <th className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">Buyer Name</th>
                    <th className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">Buyer Email</th>
                    <th className="px-6 py-4 text-green-600 dark:text-green-400 font-bold text-center">Required Workers</th>
                    <th className="px-6 py-4 text-green-600 dark:text-green-400 font-bold text-center">Payable Amount</th>
                    <th className="px-6 py-4 text-green-600 dark:text-green-400 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {tasks.map((task) => (
                    <tr key={task.Buyer_email} className="hover:bg-indigo-50/30 dark:hover:bg-gray-800/60 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-pink-700 dark:text-pink-400 block max-w-xs truncate md:max-w-md">
                          {task.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {task.Buyer_name}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {task.Buyer_email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                          <FaUsers className="text-indigo-400 dark:text-indigo-500" />
                          <span className="font-medium">{task.required_workers}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 font-bold">
                          <FaDollarSign size={14} />
                          <span>{task.payable_amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(task.Buyer_email)}
                          className="bg-red-50 dark:bg-red-950/50 text-red-500 dark:text-red-400 p-2.5 rounded-xl hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-all duration-300 shadow-sm cursor-pointer"
                          title="Delete Task"
                        >
                          <FaTrashAlt size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Condition 2: No Data UI */
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
            <FaTasks size={40} className="mb-2 opacity-25" />
            <p className="text-base font-medium">No tasks available to manage.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
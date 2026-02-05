import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
// import axiosSecure from "../../../hooks/axiosSecure";
import Swal from "sweetalert2";
import { Trash2, Users, DollarSign, Briefcase } from "lucide-react";
import axiosSecure from "../../../hooks/useAxiosSecure";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks/my");
      const data = Array.isArray(res.data) ? res.data : res.data.tasks;
      setTasks(data);
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: { popup: "rounded-2xl" },
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/tasks/${taskId}`);
      Swal.fire({
        title: "Deleted!",
        text: "Task has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchTasks();
    } catch (err) {
      Swal.fire("Error!", "Failed to delete task", "error");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:max-w-6xl mx-auto pt-20 pb-12">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            My Tasks
          </h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Manage and track your posted opportunities.
          </p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
          <span className="text-indigo-700 font-medium text-sm md:text-base">
            Total Tasks: {tasks.length}
          </span>
        </div>
      </div>

      {/* Table view for large screens */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
                Task Details
              </th>
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                Required Workers
              </th>
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                Payable Amount
              </th>
              <th className="px-6 py-4 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400 animate-pulse">
                  Loading tasks...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                  No tasks found. Start by creating one!
                </td>
              </tr>
            ) : (
              tasks.map((t) => (
                <tr key={t._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        <Briefcase size={18} />
                      </div>
                      <span className="font-semibold text-gray-800 text-sm md:text-base">{t.title}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center text-gray-600 font-medium text-sm md:text-base">
                    <div className="flex items-center justify-center gap-1">
                      <Users size={16} className="text-gray-400" />
                      {t.required_workers}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold text-xs md:text-sm">
                      <DollarSign size={14} />
                      {t.payable_amount}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="inline-flex items-center gap-2 text-red-500 hover:text-white border border-red-100 hover:bg-red-500 px-3 md:px-4 py-2 rounded-xl transition-all duration-300 font-medium text-xs md:text-sm group-hover:shadow-md"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile/tablet */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {tasks.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">No tasks found</p>
          </div>
        ) : (
          tasks.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base">{t.title}</h3>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-2 md:px-3 py-1 rounded-full font-bold text-xs md:text-sm">
                  ${t.payable_amount}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 border-t border-gray-50 pt-2 md:pt-3">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{t.required_workers} Workers</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(t._id)}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 md:py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all font-semibold text-xs md:text-sm"
              >
                <Trash2 size={18} />
                Delete Task
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTasks;

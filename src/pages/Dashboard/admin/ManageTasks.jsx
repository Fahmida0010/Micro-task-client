import { useEffect, useState } from "react";
import { FaTrashAlt, FaTasks, FaUsers, FaDollarSign, FaUser, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosSecure from "../../../hooks/useAxiosSecure";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosSecure.get("/managetasks").then((res) => setTasks(res.data));
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
        axiosSecure.delete(`/tasks/${email}`)
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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 mt-14 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaTasks className="text-indigo-600" /> Manage Tasks
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Review and manage all posted tasks from buyers.</p>
        </div>
        <div className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-md font-semibold text-center sm:text-left text-sm sm:text-base">
          Total Tasks: {tasks.length}
        </div>
      </div>

      {tasks.length > 0 ? (
        <>
          {/* 📱 Mobile & Tablet View: CARD METHOD (Visible on small screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {tasks.map((task) => (
              <div 
                key={task.Buyer_email} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between gap-4 relative hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-bold text-pink-700 text-base sm:text-lg mb-2 line-clamp-2">
                    {task.title}
                  </h3>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <p className="flex items-center gap-2 font-medium text-gray-800">
                      <FaUser className="text-indigo-500 text-xs" /> {task.Buyer_name}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-gray-500 truncate">
                      <FaEnvelope className="text-indigo-400 text-xs flex-shrink-0" /> {task.Buyer_email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      <FaUsers className="text-indigo-500" />
                      <span>Req: {task.required_workers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                      <FaDollarSign size={12} />
                      <span>{task.payable_amount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(task.Buyer_email)}
                    className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Delete Task"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 Desktop & Laptop View: TABLE METHOD (Hidden on small screens) */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-green-600 font-bold">Task Title</th>
                    <th className="px-6 py-4 text-green-600 font-bold">Buyer Name</th>
                    <th className="px-6 py-4 text-green-600 font-bold">Buyer Email</th>
                    <th className="px-6 py-4 text-green-600 font-bold text-center">Required Workers</th>
                    <th className="px-6 py-4 text-green-600 font-bold text-center">Payable Amount</th>
                    <th className="px-6 py-4 text-green-600 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tasks.map((task) => (
                    <tr key={task.Buyer_email} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-pink-700 block max-w-xs truncate md:max-w-md">
                          {task.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {task.Buyer_name}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {task.Buyer_email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                          <FaUsers className="text-indigo-400" />
                          <span className="font-medium">{task.required_workers}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-green-600 font-bold">
                          <FaDollarSign size={14} />
                          <span>{task.payable_amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(task.Buyer_email)}
                          className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
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
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <div className="flex flex-col items-center text-gray-400">
            <FaTasks size={40} className="mb-2 opacity-20" />
            <p className="text-base font-medium">No tasks available to manage.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
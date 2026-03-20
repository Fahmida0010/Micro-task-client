import { useEffect, useState } from "react";
import { FaTrashAlt, FaTasks, FaUsers, FaDollarSign } from "react-icons/fa";
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
          setTasks(tasks.filter((task) => task.Buyer_email !== email)); // fixed
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 mt-14 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaTasks className="text-indigo-600" /> Manage Tasks
          </h2>
          <p className="text-gray-500 mt-1">Review and manage all posted tasks from buyers.</p>
        </div>
        <div className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold">
          Total Tasks: {tasks.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
  <th className="px-6 py-4 text-green-500 font-bold">Task Title</th>
  <th className="px-6 py-4  text-green-500 font-bold">Buyer Name</th>
  <th className="px-6 py-4   text-green-500 font-bold">Buyer Email</th>
  <th className="px-6 py-4  text-green-500 font-bold text-center">Required Workers</th>
  <th className="px-6 py-4  text-green-500 font-bold text-center">Payable Amount</th>
  <th className="px-6 py-4  text-green-500 font-bold text-center">Action</th>
</tr>

            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.length > 0 ? (
                tasks.map((task) => (
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
                        className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90 shadow-sm"
                        title="Delete Task"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center text-gray-400">
                      <FaTasks size={40} className="mb-2 opacity-20" />
                      <p>No tasks available to manage.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
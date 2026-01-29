import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axiosSecure from "../../../hooks/useAxiosSecure";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks/my"); 
      setTasks(res.data);
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // delete task
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosSecure.delete(`/tasks/${taskId}`); // JWT auto
      toast.success("Task deleted successfully");
      fetchTasks(); // refresh tasks
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">My Tasks</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Workers</th>
              <th className="border p-3 text-left">Pay</th>
              <th className="border p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="border p-3">{t.title}</td>
                  <td className="border p-3">{t.required_workers}</td>
                  <td className="border p-3">${t.payable_amount}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;

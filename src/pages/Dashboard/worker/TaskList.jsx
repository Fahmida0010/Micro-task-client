import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../../hooks/useAxiosSecure";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Filters
  const [taskType, setTaskType] = useState("");
  const [status, setStatus] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [sort, setSort] = useState("deadline");

  useEffect(() => {
    axiosSecure
      .get("/tasks", {
        params: { taskType, status, maxAmount, deadline, sort }
      })
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, [taskType, status, maxAmount, deadline, sort]);

  const handleViewDetails = (id) => navigate(`/dashboard/task-details/${id}`);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-8 mb-8">Available Tasks</h2>

      {/* FILTER SECTION */}
      <div className="grid md:grid-cols-5 gap-4 mb-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 outline-none transition-all"
        >
          <option value="" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">All Types</option>
          <option value="Social" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Social</option>
          <option value="Survey" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Survey</option>
          <option value="Video" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Video</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-medium focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 outline-none transition-all"
        >
          <option value="" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">All Status</option>
          <option value="active" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Active</option>
          <option value="completed" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Completed</option>
          <option value="closed" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Closed</option>
        </select>

        <input
          type="number"
          placeholder="Max Reward"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 placeholder-green-400 dark:placeholder-green-500 font-medium focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800 outline-none transition-all"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-medium focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-800 outline-none transition-all"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-800 outline-none transition-all"
        >
          <option value="deadline" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Sort by Deadline</option>
          <option value="amount" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">Sort by Highest Reward</option>
        </select>
      </div>

      {/* TASK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task._id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4 h-14 overflow-hidden">{task.title}</h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                 <span className="text-gray-400 dark:text-gray-500 ml-1">Buyer:</span> <span className="text-gray-700 dark:text-gray-300">{task.Buyer_name}</span>
              </p>
              
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                 <span className="text-gray-400 dark:text-gray-500 ml-1">Reward:</span> <span className="text-green-600 dark:text-green-400 font-bold">${task.payable_amount}</span>
              </p>
              
              <p className="text-green-500 dark:text-green-400 font-medium">
                 <span className="text-gray-400 dark:text-gray-500 ml-1">Status:</span> <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold uppercase">{task.status}</span>
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                 <span className="text-gray-400 dark:text-gray-500 ml-1">Deadline:</span> <span className="text-orange-600 dark:text-orange-400">{new Date(task.completion_date).toDateString()}</span>
              </p>
            </div>

            <button
              onClick={() => handleViewDetails(task._id)}
              className="w-full bg-gradient-to-r from-green-700 to-green-900 dark:from-green-800 dark:to-green-900 hover:from-green-600 hover:to-green-800 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-bold py-3 rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 mt-20 text-lg">No tasks found matching your filters.</p>
      )}

    </div>
  );
};

export default TaskList;
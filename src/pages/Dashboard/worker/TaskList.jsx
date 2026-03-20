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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mt-8 mb-8">Available Tasks</h2>

      {/* FILTER SECTION */}
      <div className="grid md:grid-cols-5 gap-4 mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="border border-gray-200 p-3 rounded-xl bg-blue-50 text-blue-700 font-medium focus:ring-2 focus:ring-blue-300 outline-none transition-all"
        >
          <option value="">All Types</option>
          <option value="Social">Social</option>
          <option value="Survey">Survey</option>
          <option value="Video">Video</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 p-3 rounded-xl bg-purple-50 text-purple-700 font-medium focus:ring-2 focus:ring-purple-300 outline-none transition-all"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="number"
          placeholder="Max Reward"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border border-gray-200 p-3 rounded-xl bg-green-50 text-green-700 placeholder-green-400 font-medium focus:ring-2 focus:ring-green-300 outline-none transition-all"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border border-gray-200 p-3 rounded-xl bg-orange-50 text-orange-700 font-medium focus:ring-2 focus:ring-orange-300 outline-none transition-all"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-200 p-3 rounded-xl bg-indigo-50 text-indigo-700 font-medium focus:ring-2 focus:ring-indigo-300 outline-none transition-all"
        >
          <option value="deadline">Sort by Deadline</option>
          <option value="amount">Sort by Highest Reward</option>
        </select>
      </div>

      {/* TASK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="font-bold text-xl text-gray-800 mb-4 h-14 overflow-hidden">{task.title}</h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-gray-500 font-medium">
                 <span className="text-gray-400 ml-1">Buyer:</span> <span className="text-gray-700">{task.Buyer_name}</span>
              </p>
              
              <p className="text-gray-500 font-medium">
                 <span className="text-gray-400 ml-1">Reward:</span> <span className="text-green-600 font-bold">${task.payable_amount}</span>
              </p>
              
              <p className="text-green-500 font-medium">
                 <span className="text-gray-400 ml-1">Status:</span> <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase">{task.status}</span>
              </p>
              
              <p className="text-gray-700 font-medium">
                 <span className="text-gray-400 ml-1">Deadline:</span> <span className="text-orange-600">{new Date(task.completion_date).toDateString()}</span>
              </p>
            </div>

            <button
              onClick={() => handleViewDetails(task._id)}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-black hover:to-gray-800 text-white font-bold py-3 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <p className="text-center text-gray-400 mt-20 text-lg">No tasks found matching your filters.</p>
      )}

    </div>
  );
};

export default TaskList;
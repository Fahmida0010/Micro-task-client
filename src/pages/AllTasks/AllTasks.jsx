import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loader/Loading";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Filters
  const [taskType, setTaskType] = useState("");
  const [status, setStatus] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [sort, setSort] = useState("deadline");

  useEffect(() => {
    setLoading(true);

    const baseURL =
      import.meta.env.VITE_API_URL ||
      "https://micro-task-server-six.vercel.app";

    // 🟢 Shudhu jeigula input e value ache oigulai params e pathabo (Clean Query Params)
    const queryParams = {};
    if (taskType) queryParams.taskType = taskType;
    if (status) queryParams.status = status;
    if (maxAmount) queryParams.maxAmount = maxAmount;
    if (deadline) queryParams.deadline = deadline;
    if (sort) queryParams.sort = sort;

    // 🟢 Direct axios call without token for public tasks access
    axios
      .get(`${baseURL}/tasks`, { params: queryParams })
      .then((res) => {
        // Backend array ba object return korleo safely set kora
        const fetchedTasks = Array.isArray(res.data) ? res.data : res.data.tasks || [];
        setTasks(fetchedTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Task fetch error:", err);
        setTasks([]);
        setLoading(false);
      });
  }, [taskType, status, maxAmount, deadline, sort]);

  // View Details Logic - Directly navigates
  const handleViewDetails = (id) => {
    navigate(`/dashboard/task-details/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-8">
          Available Tasks
        </h2>

        {/* FILTER SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 outline-none transition-all cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              All Types
            </option>
            <option value="Social" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Social
            </option>
            <option value="Survey" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Survey
            </option>
            <option value="Video" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Video
            </option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-medium focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 outline-none transition-all cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              All Status
            </option>
            <option value="active" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Active
            </option>
            <option value="completed" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Completed
            </option>
            <option value="closed" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Closed
            </option>
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
            className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-medium focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-800 outline-none transition-all cursor-pointer"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-800 outline-none transition-all cursor-pointer"
          >
            <option value="deadline" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Sort by Deadline
            </option>
            <option value="amount" className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              Sort by Highest Reward
            </option>
          </select>
        </div>

        {/* TASK GRID */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-3 h-12 overflow-hidden leading-snug">
                    {task.title}
                  </h3>

                  <div className="space-y-2 mb-5 text-sm">
                    <p className="text-gray-500 dark:text-gray-400 font-medium truncate">
                      <span className="text-gray-400 dark:text-gray-500">Buyer:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        {task.Buyer_name || "Unknown"}
                      </span>
                    </p>

                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      <span className="text-gray-400 dark:text-gray-500">Reward:</span>{" "}
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        ${task.payable_amount}
                      </span>
                    </p>

                    <p className="text-green-500 dark:text-green-400 font-medium flex items-center gap-1">
                      <span className="text-gray-400 dark:text-gray-500">Status:</span>
                      <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-full text-[11px] font-bold uppercase">
                        {task.status || "active"}
                      </span>
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 font-medium text-xs">
                      <span className="text-gray-400 dark:text-gray-500">Deadline:</span>{" "}
                      <span className="text-orange-600 dark:text-orange-400">
                        {task.completion_date
                          ? new Date(task.completion_date).toDateString()
                          : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(task._id)}
                  className="w-full bg-gradient-to-r from-green-700 to-green-900 dark:from-green-800 dark:to-green-900 hover:from-green-600 hover:to-green-800 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-bold py-2.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800 mt-6">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              No tasks found matching your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllTasks;
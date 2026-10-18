import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const baseURL =
      import.meta.env.VITE_API_URL ||
      "https://micro-task-server-six.vercel.app";

    axios
      .get(`${baseURL}/tasks`)
      .then((res) => {
        // সর্ব শেষ ৪টি টাস্ক ফিল্টার বা স্লাইস করা হলো
        const latestFourTasks = res.data.slice(0, 4);
        setTasks(latestFourTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Featured task fetch error:", err);
        setLoading(false);
      });
  }, []);

  // View Details Click Handlers
  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/dashboard/task-details/${id}`);
    }
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
              Featured Tasks
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Explore the latest available tasks and start earning.
            </p>
          </div>

          <button
            onClick={() => navigate("/tasks")}
            className="text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 flex items-center gap-1 self-start sm:self-auto transition-colors"
          >
            See All Tasks
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Loading Spinner / Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 animate-pulse h-64"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-6"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full mt-auto"></div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-lg">
            No featured tasks available right now.
          </p>
        ) : (
          /* TASK GRID (Responsive Layout: 1 col on Mobile, 2 on Tablet, 4 on Desktop) */
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
                      <span className="text-gray-400 dark:text-gray-500">
                        Buyer:
                      </span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        {task.Buyer_name || "Unknown"}
                      </span>
                    </p>

                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      <span className="text-gray-400 dark:text-gray-500">
                        Reward:
                      </span>{" "}
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        ${task.payable_amount}
                      </span>
                    </p>

                    <p className="text-green-500 dark:text-green-400 font-medium flex items-center gap-1">
                      <span className="text-gray-400 dark:text-gray-500">
                        Status:
                      </span>
                      <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-full text-[11px] font-bold uppercase">
                        {task.status || "active"}
                      </span>
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 font-medium text-xs">
                      <span className="text-gray-400 dark:text-gray-500">
                        Deadline:
                      </span>{" "}
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
        )}
      </div>
    </section>
  );
};

export default FeaturedTasks;
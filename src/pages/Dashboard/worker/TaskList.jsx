import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../context/AuthProvider";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure
      .get("/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/dashboard/task-details/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mt-12 mb-4">Available Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <div key={task._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{task.task_title}</h3>
           <p>Title: {task.title}</p>
            <p>Buyer: {task.Buyer_name}</p>
            <p>Pay: ${task.payable_amount}</p>
            <p>Required Workers: {task.required_workers}</p>
            <p>Completion: {new Date(task.completion_date).toDateString()}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleViewDetails(task._id)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

import { useEffect, useState } from "react";
import axiosSecure from "../../../hooks/useAxiosSecure";


const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosSecure.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const handleDelete = id => {
    axiosSecure.delete(`/tasks/${id}`).then(() => {
      setTasks(tasks.filter(t => t._id !== id));
    });
  };

  return (
    <div>
      <h2>Manage Tasks</h2>

      {tasks.map(task => (
        <div key={task._id}>
          <p>{task.task_title}</p>
          <p>{task.payable_amount}</p>
          <p>{task.required_workers}</p>

          <button onClick={() => handleDelete(task._id)}>
            Delete Task
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageTasks;

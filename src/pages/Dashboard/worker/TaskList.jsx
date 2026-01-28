import { useEffect, useState } from "react";
import { getTasks, submitTask } from "../../../api/workerApi";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks().then(res => setTasks(res.data));
  }, []);

  const handleSubmit = (task) => {
    const submissionDetails = prompt("Enter submission details:");
    if (!submissionDetails) return;
    const email = localStorage.getItem("user-email");
    submitTask({
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: email,
      submission_details: submissionDetails,
      worker_name: localStorage.getItem("user-name"),
      Buyer_name: task.Buyer_name,
      Buyer_email: task.Buyer_email,
      status: "pending",
      date: new Date(),
    }).then(() => alert("Submission Added"));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>
      <div className="grid grid-cols-2 gap-4">
        {tasks.map(task => (
          <div key={task._id} className="border p-4 rounded">
            <h3 className="font-semibold">{task.task_title}</h3>
            <p>Buyer: {task.Buyer_name}</p>
            <p>Pay: {task.payable_amount}</p>
            <p>Required Workers: {task.required_workers}</p>
            <p>Completion: {new Date(task.completion_date).toDateString()}</p>
            <button
              onClick={() => handleSubmit(task)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Submit Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

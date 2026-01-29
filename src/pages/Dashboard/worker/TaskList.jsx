import { useEffect, useState } from "react";
import axios from "axios";
import axiosSecure from "../../../hooks/useAxiosSecure";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    axiosSecure
      .get("/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));

  }, []);

  const handleSubmit = (task) => {

    const submissionDetails = prompt("Enter submission details:");
    if (!submissionDetails) return;

    const email = localStorage.getItem("user-email");
    const name = localStorage.getItem("user-name");

    const submitInfo = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: email,
      worker_name: name,
      Buyer_name: task.Buyer_name,
      Buyer_email: task.Buyer_email,
      submission_details: submissionDetails,
      status: "pending",
      date: new Date(),
    };

    axiosSecure
      .post("/task-submit", submitInfo)
      .then(() => alert("Submission Added"))
      .catch(err => console.log(err));
  };

  return (
    <div className="p-4">

      <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {tasks.map(task => (
          <div
            key={task._id}
            className="border p-4 rounded shadow"
          >

            <h3 className="font-semibold text-lg">
              {task.task_title}
            </h3>

            <p>Buyer: {task.Buyer_name}</p>
            <p>Pay: ${task.payable_amount}</p>
            <p>Required Workers: {task.required_workers}</p>
            <p>
              Completion: {new Date(task.completion_date).toDateString()}
            </p>

            <button
              onClick={() => handleSubmit(task)}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
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

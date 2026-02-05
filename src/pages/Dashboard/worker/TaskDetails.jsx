import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../context/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../../../components/Loader/Loading";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");

  useEffect(() => {
    axiosSecure
      .get(`/tasks/${id}`)
      .then(res => setTask(res.data))
      .catch(err => toast.error("Failed to load task"));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submissionDetails.trim()) {
      return toast.error("Please write submission details");
    }

    const submitInfo = {
      task_id: task._id,
      task_title: task.title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      Buyer_name: task.Buyer_name,
      Buyer_email: task.Buyer_email,
      submission_details: submissionDetails,
      status: "pending",
      current_date: new Date()
    };

    axiosSecure
      .post("/task-submit", submitInfo)
      .then(() => {
        toast.success("Task submitted successfully!");
        setSubmissionDetails("");
      })
      .catch(() => toast.error("Submission failed"));
  };

  if (!task) return <Loading/>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-3xl font-bold mb-6 mt-6
      text-gray-800">Task Details</h2>

      {/* ===== Task Info Card ===== */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border-l-4 border-blue-500 space-y-3">
          <p><span className="font-semibold text-gray-700">Title:</span> {task.title}</p>
        <p><span className="font-semibold text-gray-700">Buyer:</span> {task.Buyer_name}</p>
        <p><span className="font-semibold text-gray-700">Buyer Email:</span> {task.Buyer_email}</p>
        <p><span className="font-semibold text-gray-700">Payable Amount:</span> <span className="text-green-600 font-semibold">${task.payable_amount}</span></p>
        <p><span className="font-semibold text-gray-700">Required Workers:</span> {task.required_workers}</p>
        <p><span className="font-semibold text-gray-700">Completion Date:</span> {new Date(task.completion_date).toDateString()}</p>
      </div>

      {/* ===== Submission Form Card ===== */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Submit Your Work</h3>
        <textarea
          placeholder="Write your submission details here..."
          className="w-full border p-3 rounded-lg h-32 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none"
          value={submissionDetails}
          onChange={(e) => setSubmissionDetails(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;

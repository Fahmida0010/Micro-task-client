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
  const [loading, setLoading] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load task + check if already submitted
  useEffect(() => {
    const loadTaskAndCheckSubmission = async () => {
      try {
        setLoading(true);

        // Get task
        const taskRes = await axiosSecure.get(`/tasks/${id}`);
        console.log("Task ID:", id);
        setTask(taskRes.data);

        // Check if already submitted
        if (user?.email && taskRes.data?._id) {
          const checkRes = await axiosSecure.get(
            `/check-submission?task_id=${taskRes.data._id}&email=${user.email}`
          );
          setAlreadySubmitted(checkRes.data.alreadySubmitted);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };

    loadTaskAndCheckSubmission();
  }, [id, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submissionDetails.trim()) {
      return toast.error("Please write submission details");
    }

    if (alreadySubmitted) {
      return toast.error("You have already submitted this task!");
    }

    if (task.required_workers <= 0) {
      return toast.error("No more slots available for this task");
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
    };

    setSubmitting(true);

    try {
      const res = await axiosSecure.post("/task-submit", submitInfo);

      toast.success(res.data.message || "Submission successful!");

      // Update UI
      setAlreadySubmitted(true);
      setSubmissionDetails("");

      // Refresh task data
      const updatedTaskRes = await axiosSecure.get(`/tasks/${task._id}`);
      setTask(updatedTaskRes.data);
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
        if (err.response.data.message.includes("already submitted")) {
          setAlreadySubmitted(true);
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  if (!task) return <div className="text-center py-10">Task not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 mt-14">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-6">Task Details</h1>

      {/* Task Info Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
        <h2 className="text-2xl text-pink-700 font-semibold mb-4">{task.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 
        text-purple-700">
          <div>
            <p>
              <strong className="text-yellow-800">Buyer:</strong> {task.Buyer_name}
            </p>
            <p>
              <strong  className="text-yellow-800">Email:</strong> {task.Buyer_email}
            </p>
          </div>
          <div>
            <p>
              <strong  className="text-yellow-800">Pay:</strong> ${task.payable_amount}
            </p>
            <p>
              <strong  className="text-yellow-800">Required Workers:</strong> {task.required_workers}
            </p>
            <p>
              <strong  className="text-yellow-800">Deadline:</strong>{" "}
              {new Date(task.completion_date).toDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Submit Your Work</h2>

        {alreadySubmitted ? (
          <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-5 rounded-lg">
            <p className="font-medium">You have already submitted this task.</p>
            <p className="mt-1">Waiting for buyer review.</p>
          </div>
        ) : task.required_workers <= 0 ? (
          <div className="bg-red-50 border border-red-400 text-red-800 px-4 py-5 rounded-lg">
            <p className="font-medium">No more submission slots available.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Submission Details 
              </label>
              <textarea
                value={submissionDetails}
                onChange={(e) => setSubmissionDetails(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 h-40 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your submission details here... (screenshot link, explanation, etc.)"
                required
                disabled={submitting}
              />
            </div>

            <button
              type="submit"
              disabled={submitting || alreadySubmitted || task.required_workers <= 0}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all
                ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                }`}
            >
              {submitting ? "Submitting..." : "Submit Task"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
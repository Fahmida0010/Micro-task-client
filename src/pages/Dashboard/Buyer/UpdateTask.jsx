import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    TaskDetail: "",
    submission_Details: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/tasks/my")
      .then((res) => {
        const found = res.data.find((t) => t._id === id);
        if (found) {
          setTask({
            title: found.title || "",
            TaskDetail: found.TaskDetail || "",
            submission_Details: found.submission_Details || "",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: simple validation
    if (!task.title.trim() || !task.TaskDetail.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Title and Task Details are required!",
      });
      return;
    }

    try {
      await axiosSecure.patch(`/tasks/${id}`, {
        title: task.title,
        TaskDetail: task.TaskDetail,
        submission_Details: task.submission_Details,
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Task has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-tasks");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update task. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Update Task
          </h2>
          <p className="text-green-100 mt-2">Modify your task details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Task Details */}
          <div>
            <label
              htmlFor="TaskDetail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="TaskDetail"
              name="TaskDetail"
              value={task.TaskDetail}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-y"
              placeholder="Describe the task in detail..."
              required
            />
          </div>

          {/* Submission Details */}
          <div>
            <label
              htmlFor="submission_Details"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Submission Instructions
            </label>
            <textarea
              id="submission_Details"
              name="submission_Details"
              value={task.submission_Details}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-y"
              placeholder="How should this task be submitted? (optional)"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Update Task
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/my-tasks")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
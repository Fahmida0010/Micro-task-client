import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../../context/AuthProvider";
import axiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

const AddTask = () => {
  const { user , refetchUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const imageFile = form.image.files[0];

    if (!imageFile) {
      toast.error("Please select an image!");
      setLoading(false);
      return;
    }

    // Upload image
    let imageUrl = "";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );
      imageUrl = imgRes.data.data.display_url;
    } catch (err) {
      toast.error("Image upload failed!");
      setLoading(false);
      return;
    }

    const task = {
      Buyer_email: user.email,
      Buyer_name: user.displayName || "Buyer",
      title: form.title.value,
      detail: form.detail.value,
      required_workers: Number(form.workers.value),
      payable_amount: Number(form.amount.value),
      completion_date: form.date.value,
      submission_info: form.submission.value,
      task_image_url: imageUrl,
    };

    try {
      await axiosSecure.post("/tasks", task);

      toast.success("Task added successfully!");
      await refetchUser();

      navigate("/dashboard/my-tasks");

    } catch (err) {

      if (err.response?.status === 400) {
        toast.error("Not enough coins, Purchase coins !");
        toast.error("Not enough coins, Purchase coins !");
        navigate("/dashboard/purchase-coin");
      } else {
        toast.error("Failed to add task!");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <Toaster position="top-right" />

      <h2 className="text-2xl font-bold mb-6 mt-8">Add New Task</h2>

      <form onSubmit={handleAdd} className="space-y-4">

        <input
          name="title"
          placeholder="Task Title"
          required
          className="w-full p-3 border rounded"
        />

        <textarea
          name="detail"
          placeholder="Task Details"
          className="w-full p-3 border rounded h-24"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="workers"
            type="number"
            placeholder="Required Workers"
            required
            className="p-3 border rounded"
          />

          <input
            name="amount"
            type="number"
            placeholder="Payable Amount"
            required
            className="p-3 border rounded"
          />
        </div>

        <input
          name="date"
          type="date"
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="submission"
          placeholder="Submission Info"
          className="w-full p-3 border rounded"
        />

        <input
          name="image"
          type="file"
          accept="image/*"
          required
          className="w-full p-3 border rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Adding Task..." : "Add Task"}
        </button>

      </form>
    </div>
  );
};

export default AddTask;

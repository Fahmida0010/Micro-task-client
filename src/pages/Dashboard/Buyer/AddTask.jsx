// src/pages/dashboard/buyer/AddTask.jsx
import { addTask } from "../../../api/buyerApi";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const f = e.target;

    const task = {
      title: f.title.value,
      detail: f.detail.value,
      required_workers: Number(f.workers.value),
      payable_amount: Number(f.amount.value),
      completion_date: f.date.value,
      submission_info: f.submission.value,
      image: f.image.value,
    };

    const totalPay = task.required_workers * task.payable_amount;

    if (totalPay > 100) { // demo coin check
      alert("Not available Coin. Purchase Coin");
      return navigate("/dashboard/purchase-coin");
    }

    await addTask(task);
    navigate("/dashboard/my-tasks");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-2xl">
        <input name="title" placeholder="Task Title" required className="w-full p-3 border rounded" />
        <textarea name="detail" placeholder="Task Details" className="w-full p-3 border rounded h-24" />
        <div className="grid grid-cols-2 gap-4">
          <input name="workers" type="number" placeholder="Required Workers" required className="p-3 border rounded" />
          <input name="amount" type="number" placeholder="Payable Amount" required className="p-3 border rounded" />
        </div>
        <input name="date" type="date" required className="w-full p-3 border rounded" />
        <input name="submission" placeholder="Submission Info" className="w-full p-3 border rounded" />
        <input name="image" placeholder="Image URL" className="w-full p-3 border rounded" />
        <button className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;

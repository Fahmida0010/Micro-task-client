import { useEffect, useState } from "react";
import axios from "axios";

const WorkerHome = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("user-email");

    axios
      .get(`http://localhost:3000/worker-stats/${email}`)
      .then(res => setStats(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div className="p-4">

      <h2 className="text-2xl font-bold mb-4">Worker Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="border rounded p-4 shadow">
          <p className="font-semibold">Total Submissions</p>
          <p className="text-xl">{stats.totalSubmissions || 0}</p>
        </div>

        <div className="border rounded p-4 shadow">
          <p className="font-semibold">Pending</p>
          <p className="text-xl">{stats.totalPending || 0}</p>
        </div>

        <div className="border rounded p-4 shadow">
          <p className="font-semibold">Total Earnings</p>
          <p className="text-xl">${stats.totalEarning || 0}</p>
        </div>

      </div>

      <h3 className="mt-6 text-xl font-semibold">Approved Submissions</h3>

      <table className="w-full border mt-2">

        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Task</th>
            <th className="border p-2">Pay</th>
            <th className="border p-2">Buyer</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {stats.approvedSubmissions?.map(sub => (
            <tr key={sub._id}>

              <td className="border p-2">
                {sub.task_title}
              </td>

              <td className="border p-2">
                ${sub.payable_amount}
              </td>

              <td className="border p-2">
                {sub.Buyer_name}
              </td>

              <td className="border p-2 text-green-600 font-semibold">
                {sub.status}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default WorkerHome;

// src/pages/dashboard/worker/WorkerHome.jsx
import { useEffect, useState } from "react";
import { getWorkerStats } from "../../../api/workerApi";

const WorkerHome = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("user-email");
    getWorkerStats(email).then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Worker Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          Total Submissions: {stats.totalSubmissions}
        </div>
        <div className="card">
          Pending: {stats.totalPending}
        </div>
        <div className="card">
          Total Earnings: ${stats.totalEarning}
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Approved Submissions</h3>
      <table className="w-full border mt-2">
        <thead>
          <tr>
            <th>Task</th>
            <th>Pay</th>
            <th>Buyer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stats.approvedSubmissions?.map(sub => (
            <tr key={sub._id}>
              <td>{sub.task_title}</td>
              <td>{sub.payable_amount}</td>
              <td>{sub.Buyer_name}</td>
              <td>{sub.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerHome;

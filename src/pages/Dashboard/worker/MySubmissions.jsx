import { useEffect, useState } from "react";
import { getMySubmissions } from "../../../api/workerApi";

const MySubmissions = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("user-email");
    getMySubmissions(email).then(res => setSubs(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Task</th>
            <th>Pay</th>
            <th>Buyer</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {subs.map(sub => (
            <tr
              key={sub._id}
              className={
                sub.status === "pending"
                  ? "bg-yellow-100"
                  : sub.status === "approved"
                  ? "bg-green-100"
                  : "bg-red-100"
              }
            >
              <td>{sub.task_title}</td>
              <td>{sub.payable_amount}</td>
              <td>{sub.Buyer_name}</td>
              <td>{sub.status}</td>
              <td>{new Date(sub.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySubmissions;

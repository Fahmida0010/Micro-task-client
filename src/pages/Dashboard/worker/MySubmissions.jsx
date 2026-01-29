import { useEffect, useState } from "react";
import axios from "axios";
import axiosSecure from "../../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("user-email");

    axiosSecure
      .get(`/my-submissions/${email}`)
      .then(res => setSubs(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div className="p-4">

      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Task</th>
            <th className="border p-2">Pay</th>
            <th className="border p-2">Buyer</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
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

              <td className="border p-2">
                {sub.task_title}
              </td>

              <td className="border p-2">
                ${sub.payable_amount}
              </td>

              <td className="border p-2">
                {sub.Buyer_name}
              </td>

              <td className="border p-2 font-semibold">
                {sub.status}
              </td>

              <td className="border p-2">
                {new Date(sub.date).toLocaleDateString()}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default MySubmissions;

// src/pages/dashboard/buyer/PaymentHistory.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentHistory = () => {
  const { user, token } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`${apiUrl}/payments/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(res.data);
      } catch (err) {
        console.error(err.response || err);
      }
    };

    fetchPayments();
  }, [user._id, token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">Coins</th>
              <th className="border p-3 text-left">Amount</th>
              <th className="border p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="border p-3">{p.coins || "N/A"}</td>
                  <td className="border p-3">${p.amount}</td>
                  <td className="border p-3">{new Date(p.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

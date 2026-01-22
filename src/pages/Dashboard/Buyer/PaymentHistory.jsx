// src/pages/dashboard/buyer/PaymentHistory.jsx
import { useEffect, useState } from "react";
import { getPayments } from "../../../api/buyerApi";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayments().then(res => setPayments(res.data));
  }, []);

  return (
    <div>
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
                <td colSpan="3" className="p-4 text-center text-gray-500">No payments found</td>
              </tr>
            ) : (
              payments.map(p => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="border p-3">{p.coin || 'N/A'}</td>
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

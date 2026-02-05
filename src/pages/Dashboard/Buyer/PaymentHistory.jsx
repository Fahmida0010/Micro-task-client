import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import axiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get(`/payments/${user.email}`);
        setPayments(res.data);
      } catch (err) {
        console.error("Fetch payments error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPayments();
    }
  }, [user?.email]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold mt-8 text-gray-800">Payment History</h2>
        <p className="text-gray-500 mt-2">View your recent coin purchases.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-indigo-700 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-indigo-700 uppercase tracking-wider">Coins Purchased</th>
                <th className="px-6 py-4 text-sm font-semibold text-indigo-700 uppercase tracking-wider">Amount Paid</th>
                <th className="px-6 py-4 text-sm font-semibold text-indigo-700 uppercase tracking-wider">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-400 animate-pulse">
                    Loading payment records...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2">📄</span>
                      <p className="text-gray-500 font-medium">No payments found yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-gray-400">
                        #{p.transactionId?.toUpperCase() || p._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                          🪙 {p.coins} Coins
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">
                      ${p.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(p.date).toLocaleString('en-GB', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

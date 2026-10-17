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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          Payment History
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          View your recent coin purchases.
        </p>
      </div>

      {/* Main Content Area */}
      {loading ? (
        /* ================= SKELETON LOADERS ================= */
        <div className="space-y-4">
          {/* Skeleton for Mobile (Cards) */}
          <div className="md:hidden space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-20"></div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Skeleton for Desktop (Table) */}
          <div className="hidden md:block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex justify-between items-center animate-pulse py-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/5"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : payments.length === 0 ? (
        /* Empty State */
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
          <span className="text-4xl block mb-2">📄</span>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            No payments found yet.
          </p>
        </div>
      ) : (
        <>
          {/* ================= MOBILE & TABLET CARDS VIEW ================= */}
          <div className="md:hidden space-y-3">
            {payments.map((p) => (
              <div
                key={p._id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                    #{p.transactionId?.toUpperCase() || p._id.slice(-8).toUpperCase()}
                  </span>
                  <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                    🪙 {p.coins} Coins
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-base">
                    ${p.amount.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(p.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP TABLE VIEW ================= */}
          <div className="hidden md:block bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Coins Purchased
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Amount Paid
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                  {payments.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                          #{p.transactionId?.toUpperCase() || p._id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                          🪙 {p.coins} Coins
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                        ${p.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(p.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
import { useEffect, useState } from "react";
import axiosSecure from "../../../utils/axiosSecure";

const AdminHome = () => {
  const [stats, setStats] = useState({});
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin-stats").then(res => setStats(res.data));
    axiosSecure.get("/withdraw-requests").then(res => setWithdraws(res.data));
  }, []);

  const handleApprove = (id, email, coin) => {
    axiosSecure.patch(`/withdraw-approve/${id}`, { email, coin })
      .then(() => {
        setWithdraws(withdraws.filter(w => w._id !== id));
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <p>Total Workers: {stats.workers}</p>
      <p>Total Buyers: {stats.buyers}</p>
      <p>Total Coins: {stats.totalCoin}</p>
      <p>Total Payments: {stats.totalPayments}</p>

      <h3>Withdraw Requests</h3>

      {withdraws.map(w => (
        <div key={w._id}>
          <p>{w.worker_name} - {w.withdrawal_amount}$</p>
          <button onClick={() => handleApprove(w._id, w.worker_email, w.withdrawal_coin)}>
            Payment Success
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminHome;

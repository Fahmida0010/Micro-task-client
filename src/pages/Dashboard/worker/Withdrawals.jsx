import { useEffect, useState } from "react";
import axios from "axios";
import axiosSecure from "../../../hooks/useAxiosSecure";

const Withdrawals = () => {
  const [coin, setCoin] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [system, setSystem] = useState("Bkash");

  useEffect(() => {
    const email = localStorage.getItem("user-email");

    axiosSecure
      .get(`/worker-coin/${email}`)
      .then(res => setCoin(res.data.coin))
      .catch(err => console.log(err));

  }, []);

  const handleWithdraw = () => {

    if (withdraw * 20 > coin) {
      return alert("Insufficient Coin");
    }

    const email = localStorage.getItem("user-email");
    const name = localStorage.getItem("user-name");

    const withdrawInfo = {
      worker_email: email,
      worker_name: name,
      withdrawal_coin: withdraw * 20,
      withdrawal_amount: withdraw,
      payment_system: system,
      withdraw_date: new Date(),
      status: "pending",
    };

    axiosSecure
      .post("/withdraw", withdrawInfo)
      .then(() => {
        alert("Withdrawal Requested");

        // update coin instantly in UI
        setCoin(prev => prev - withdrawInfo.withdrawal_coin);
        setWithdraw(0);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="p-4">

      <h2 className="text-2xl font-bold mb-4">Withdraw Coins</h2>

      <p className="mb-1">Available Coin: <b>{coin}</b></p>
      <p className="mb-3">Withdraw Amount ($): <b>{withdraw}</b></p>

      <input
        className="border p-2 rounded mr-2"
        type="number"
        value={withdraw}
        min={0}
        onChange={(e) => setWithdraw(Number(e.target.value))}
        placeholder="Enter amount in $"
      />

      <select
        className="border p-2 rounded mr-2"
        value={system}
        onChange={(e) => setSystem(e.target.value)}
      >
        <option>Bkash</option>
        <option>Rocket</option>
        <option>Nagad</option>
        <option>Stripe</option>
      </select>

      <button
        disabled={coin < 200}
        onClick={handleWithdraw}
        className="bg-green-500 px-4 py-2 rounded text-white disabled:bg-gray-400"
      >
        Withdraw
      </button>

      {coin < 200 && (
        <p className="text-red-500 mt-2">
          Minimum 200 coin required to withdraw
        </p>
      )}

    </div>
  );
};

export default Withdrawals;

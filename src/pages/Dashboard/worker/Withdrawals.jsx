import { useEffect, useState } from "react";
import { withdrawCoin, getWorkerCoin } from "../../../api/workerApi";

const Withdrawals = () => {
  const [coin, setCoin] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [system, setSystem] = useState("Bkash");

  useEffect(() => {
    const email = localStorage.getItem("user-email");
    getWorkerCoin(email).then(res => setCoin(res.data.coin));
  }, []);

  const handleWithdraw = () => {
    if (withdraw * 20 > coin) return alert("Insufficient Coin");
    const email = localStorage.getItem("user-email");
    const name = localStorage.getItem("user-name");
    withdrawCoin({
      worker_email: email,
      worker_name: name,
      withdrawal_coin: withdraw * 20,
      withdrawal_amount: withdraw,
      payment_system: system,
      withdraw_date: new Date(),
      status: "pending",
    }).then(() => alert("Withdrawal Requested"));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Withdraw Coins</h2>
      <p>Available Coin: {coin}</p>
      <p>Withdraw Amount ($): {withdraw}</p>
      <input
        type="number"
        value={withdraw}
        min={0}
        onChange={(e) => setWithdraw(Number(e.target.value))}
        placeholder="Enter amount in $"
      />
      <select value={system} onChange={(e) => setSystem(e.target.value)}>
        <option>Bkash</option>
        <option>Rocket</option>
        <option>Nagad</option>
        <option>Stripe</option>
      </select>
      <button
        disabled={coin < 200}
        onClick={handleWithdraw}
        className="ml-2 bg-green-500 px-3 py-1 rounded text-white"
      >
        Withdraw
      </button>
      {coin < 200 && <p className="text-red-500 mt-2">Insufficient coin</p>}
    </div>
  );
};

export default Withdrawals;

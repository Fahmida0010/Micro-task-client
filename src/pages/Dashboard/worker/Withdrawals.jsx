"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Withdrawals = () => {
  const { user, coin, setCoin } = useAuth();

  const [earning, setEarning] = useState(0);
  const [withdrawCoin, setWithdrawCoin] = useState(0);
  const [system, setSystem] = useState("Bkash");
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/user/info?email=${user.email}`)
      .then((res) => {
        const totalCoin = Number(res.data.coin);
        setCoin(totalCoin);
        setEarning(totalCoin / 20);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const withdrawAmount = withdrawCoin / 20;

  const validateAccountNumber = () => {
    if (!/^\d+$/.test(account)) {
      toast.error(`${system} number must contain digits only`);
      return false;
    }

    if (system === "Bkash" || system === "Rocket" || system === "Nagad") {
      if (account.length !== 11) {
        toast.error(`${system} number must be exactly 11 digits`);
        return false;
      }
    }

    if (system === "Stripe") {
      if (account.length !== 16) {
        toast.error("Stripe number must be exactly 16 digits");
        return false;
      }
    }

    return true;
  };

  const handleWithdraw = async () => {
    if (withdrawCoin < 200) {
      toast.error("Minimum 200 coins required to withdraw");
      return;
    }
    if (withdrawCoin > coin) {
      toast.error("Insufficient coins");
      return;
    }
    if (!account) {
      toast.error("Enter account number");
      return;
    }
    if (!validateAccountNumber()) return;

    try {
      await axiosSecure.post("/withdraw", {
        email: user.email,
        worker_name: user.displayName,
        withdrawal_coin: withdrawCoin,
        withdrawal_amount: withdrawAmount,
        payment_system: system,
        account_number: account,
      });

      toast.success("Withdrawal request submitted successfully!");

      // ❌ coin deduct remove
      setWithdrawCoin(0);
      setAccount("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Withdraw failed");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto border rounded mt-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Withdrawals</h2>

      <p><b>Total Coin:</b> {coin}</p>
      <p><b>Total Earning:</b> ${earning}</p>

      <hr className="my-4" />

      {coin < 200 ? (
        <p className="text-red-500 font-semibold">
          Insufficient coin (Minimum 200 required)
        </p>
      ) : (
        <>
          <label className="block mb-2">Coin To Withdraw</label>
          <input
            type="number"
            max={coin}
            value={withdrawCoin}
            onChange={(e) => setWithdrawCoin(Number(e.target.value))}
            className="border p-2 w-full mb-3"
          />

          <label className="block mb-2">Withdraw Amount ($)</label>
          <input
            type="number"
            value={withdrawAmount}
            disabled
            className="border p-2 w-full mb-3 bg-gray-100"
          />

          <label className="block mb-2">Payment System</label>
          <select
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            className="border p-2 w-full mb-3"
          >
            <option>Bkash</option>
            <option>Rocket</option>
            <option>Nagad</option>
            <option>Stripe</option>
          </select>

          <label className="block mb-2">{system} Number</label>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="border p-2 w-full mb-3"
            placeholder={`Enter ${system} number`}
          />

          <button
            onClick={handleWithdraw}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Withdraw
          </button>
        </>
      )}
    </div>
  );
};

export default Withdrawals;
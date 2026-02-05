import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import axiosSecure from "../../hooks/useAxiosSecure";
import Footer from "../../components/Footer/Footer";

const PaymentSuccess = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [coinsAdded, setCoinsAdded] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const coin = Number(params.get("coin"));

    if (!user?.email || !coin || coin <= 0) {
      toast.error("Invalid payment data!");
      setLoading(false);
      return;
    }

    const addCoinsAndSavePayment = async () => {
      try {
        // 1️⃣ Update user coins
        await axiosSecure.patch(`/users/coins/${user.email}`, {
          email: user.email,
          coins: coin,
        });

        // 2️⃣ Determine amount
        let amount = 0;
        if (coin === 10) amount = 1;
        else if (coin === 150) amount = 10;
        else if (coin === 500) amount = 20;
        else if (coin === 1000) amount = 35;
        else amount = Math.round(coin * 0.05 * 100) / 100;

        // 3️⃣ Save payment
        const res = await axiosSecure.post("/payments", {
          email: user.email,
          coins: coin,
          amount,
        });

        setCoinsAdded(coin);
        setTransactionId(res.data.transactionId);
        toast.success(`${coin} coins added successfully!`);
      } catch (err) {
        console.error("Payment process failed:", err);
        toast.error("Failed to process payment. Try again.");
      } finally {
        setLoading(false);
      }
    };

    addCoinsAndSavePayment();
  }, [location.search, user?.email]);

  if (loading) {
    return <div className="p-8 text-center">Processing payment...</div>;
  }

  return (
    <div className="p-8 text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="text-lg text-pink-700">
        {coinsAdded} coins added to your account.
      </p>
      {transactionId && (
        <p className="text-sm text-gray-900">
          Transaction ID: <span className="font-mono">{transactionId.toUpperCase()}</span>
        </p>
      )}
      <button
        onClick={() => navigate("/dashboard")}
        className="px-8 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Go to Dashboard
      </button>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default PaymentSuccess;

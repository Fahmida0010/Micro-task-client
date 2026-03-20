import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosSecure from "../../hooks/useAxiosSecure";
import Footer from "../../components/Footer/Footer";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [coinsPurchased, setCoinsPurchased] = useState(0); // just purchased coins
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const coin = Number(params.get("coin"));
    const email = params.get("email");
    const price = Number(params.get("price")) 

    if (!email || !coin || coin <= 0) {
      toast.error("Invalid payment data!");
      setLoading(false);
      return;
    }

    const processPayment = async () => {
      try {
        // 1️⃣ Update user's coins in DB (sum with existing coins)
        await axiosSecure.patch("/users/increase-coins", {
          email,
          coin,
        });
        setCoinsPurchased(coin); // only purchased coin show in success page
        toast.success(`${coin} coins purchased successfully!`);

        // 2️⃣ Save payment info
        await axiosSecure.post("/payments", {
          email,
          coins: coin,
          amount: price,
        });
        toast.success("Payment saved successfully!");
      } catch (err) {
        console.error("Coin increase or payment save failed:", err);
        toast.error("Payment processing failed");
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [location.search]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-medium">
        Processing payment, please wait...
      </div>
    );
  }

  return (
    <div className="p-8 text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="text-lg text-pink-700">
        You purchased {coinsPurchased} coins.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="px-8 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Go to Dashboard
      </button>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import axiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const coin = Number(params.get("coin"));

    const addCoins = async () => {
      try {
        // Using axiosSecure instead of axios
        await axiosSecure.patch(`/users/${userId}/coins`, { coins: coin });

        setUser((prev) => ({ ...prev, coin: prev.coin + coin }));
        toast.success(`Payment successful! Added ${coin} coins`);

        // Redirect to the actual success page
        navigate("/payment-success");
      } catch (err) {
        console.error(err);
        toast.error("Failed to add coins");

        // Redirect to payment failed page
        navigate("/payment-failed");
      }
    };

    addCoins();
  }, [location.search, navigate, setUser]);

  return (
    <div className="p-8 text-center text-xl">
      Processing your payment...
    </div>
  );
};

export default PaymentSuccess;

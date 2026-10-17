import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthProvider"; 
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const coin = searchParams.get("coin");
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
    
      queryClient.invalidateQueries(["dbUser", user?.email]);
      queryClient.invalidateQueries(["profileUser", user?.email]);
      
      window.dispatchEvent(new Event("profileUpdated"));
    }
  }, [user?.email, queryClient]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          You successfully purchased <span className="font-bold text-indigo-600 dark:text-indigo-400">{coin || "the"}</span> coins.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md cursor-pointer"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
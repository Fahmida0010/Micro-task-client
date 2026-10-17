import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center bg-red-100/60 dark:bg-red-950/30 rounded-none border-b border-red-200 dark:border-red-900/50">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          Payment Failed ❌
        </h2>
        <p className="mb-6 text-xl text-gray-700 dark:text-gray-300">Your payment could not be processed.</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 px-6 rounded-xl transition duration-200 shadow-md cursor-pointer font-medium"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
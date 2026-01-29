import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Content */}
      <div className="flex-grow p-35 text-center bg-red-200 rounded-none">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Payment Failed ❌
        </h2>
        <p className="mb-4 text-xl">Your payment could not be processed.</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;

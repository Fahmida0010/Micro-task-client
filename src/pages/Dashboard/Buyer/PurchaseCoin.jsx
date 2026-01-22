// src/pages/dashboard/buyer/PurchaseCoin.jsx
import { purchaseCoin } from "../../../api/buyerApi";

const packages = [
  { coin: 10, price: 1 },
  { coin: 150, price: 10 },
  { coin: 500, price: 20 },
  { coin: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const handlePay = async (pkg) => {
    await purchaseCoin(pkg);
    alert("Payment Successful (Dummy)");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Purchase Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map(p => (
          <div key={p.coin} className="border border-indigo-200 p-6 text-center rounded-lg bg-white shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">{p.coin}</h3>
            <p className="text-gray-600 mb-4">Coins</p>
            <p className="text-3xl font-bold text-green-600 mb-4">${p.price}</p>
            <button onClick={() => handlePay(p)} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-semibold">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;

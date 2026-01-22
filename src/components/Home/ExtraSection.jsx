import { motion } from "framer-motion";

const ExtraSections = () => {
  return (
    <>
      {/* How it works */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">⚙ How It Works</h2>
        <p>Register → Complete Tasks → Earn Coins → Withdraw</p>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-indigo-50 text-center">
        <h2 className="text-3xl font-bold mb-6">🚀 Why Choose Us</h2>
        <div className="flex justify-center gap-8">
          <motion.div whileHover={{ scale: 1.1 }}>Secure</motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>Fast</motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>Trusted</motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">🎯 Start Earning Today</h2>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          Join Now
        </button>
      </section>
    </>
  );
};

export default ExtraSections;

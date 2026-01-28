import { motion } from "framer-motion";

const ExtraSections = () => {
  return (
    <>
      {/* How it works */}
     {/* How it works */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
      ⚙ How It Works
    </h2>
    <p className="text-center text-gray-600 mb-14">
      Start earning in just a few simple steps
    </p>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Step 1 */}
      <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
        <div className="w-14 h-14 mx-auto flex items-center 
        justify-center rounded-full bg-indigo-100 text-indigo-600
         text-2xl font-bold">
          
        </div>
        <h3 className="mt-5 text-xl font-semibold">Register</h3>
        <p className="mt-2 text-gray-600 text-sm">
          Create your free account in just a few seconds using email or Google.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl font-bold">
          2
        </div>
        <h3 className="mt-5 text-xl font-semibold">Complete Tasks</h3>
        <p className="mt-2 text-gray-600 text-sm">
          Choose simple tasks and complete them anytime, anywhere.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl font-bold">
          3
        </div>
        <h3 className="mt-5 text-xl font-semibold">Earn Coins</h3>
        <p className="mt-2 text-gray-600 text-sm">
          Get rewarded instantly after task approval with virtual coins.
        </p>
      </div>

      {/* Step 4 */}
      <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-2xl font-bold">
          4
        </div>
        <h3 className="mt-5 text-xl font-semibold">Withdraw</h3>
        <p className="mt-2 text-gray-600 text-sm">
          Convert your coins to real money and withdraw securely.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Why Choose Us */}
<section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
  <div className="max-w-6xl mx-auto px-4">
    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-center mb-4"
    >
      🚀 Why Choose Us
    </motion.h2>

    <p className="text-center text-gray-600 mb-14 max-w-2xl mx-auto">
      We provide a secure, fast, and trusted platform designed to help you earn
      with confidence and ease.
    </p>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        className="bg-white rounded-2xl p-8 shadow-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-10 transition"></div>
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-2xl mb-5">
          🔐
        </div>
        <h3 className="text-xl font-semibold mb-2">Secure System</h3>
        <p className="text-gray-600 text-sm">
          Your data and earnings are protected with advanced security and
          encrypted transactions.
        </p>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 hover:opacity-10 transition"></div>
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 text-green-600 text-2xl mb-5">
          ⚡
        </div>
        <h3 className="text-xl font-semibold mb-2">Fast Payments</h3>
        <p className="text-gray-600 text-sm">
          Complete tasks and receive rewards quickly with our efficient approval
          and payment process.
        </p>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        className="bg-white rounded-2xl p-8 shadow-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 hover:opacity-10 transition"></div>
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 text-2xl mb-5">
          🤝
        </div>
        <h3 className="text-xl font-semibold mb-2">Trusted by Users</h3>
        <p className="text-gray-600 text-sm">
          Thousands of users trust our platform for reliable tasks, transparent
          earnings, and friendly support.
        </p>
      </motion.div>
    </div>
  </div>
</section>


    {/* Call to Action */}
<section className="py-16 text-center bg-gradient-to-b from-indigo-50 to-white">
  {/* Heading with fade-in */}
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl font-bold mb-6"
  >
    🎯 Start Earning Today
  </motion.h2>

  {/* Button with interactive animations */}
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }} // Slightly bigger and darker on hover
    whileTap={{ scale: 0.95 }} // Button compresses on click
    transition={{ type: "spring", stiffness: 300, damping: 20 }} // Smooth spring effect
    className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg font-medium"
  >
    Join Now
  </motion.button>

  {/* Optional floating animation to draw attention */}
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="mt-6 text-indigo-600 font-semibold"
  >
    🚀 Don’t miss out!
  </motion.div>
</section>

    </>
  );
};

export default ExtraSections;

import React from 'react'
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <div>
        
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
      Why Choose Us
    </motion.h2>

    <p className="text-center text-gray-800 mb-14 max-w-2xl mx-auto">
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
    </div>
  )
}

export default WhyChooseUs;
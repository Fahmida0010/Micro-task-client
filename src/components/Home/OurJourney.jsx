import React, { useState } from "react";
import { motion } from "framer-motion";

const OurJourney = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      {/* Call to Action Section */}

      {/* Micro Task Journey Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          📖 Our Micro Task Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-700 mb-4 text-lg"
        >
          Our platform started in 2018 with a mission to help individuals earn by completing
          simple online tasks. From the beginning, we focused on creating opportunities 
          that empower workers and provide reliable support to buyers. Over the years, 
          we have expanded our task variety and improved our systems to make earning easier
          and faster.
        </motion.p>

        {showMore && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-700 mb-4 text-lg"
          >
            Our achievements include assisting thousands of workers to gain valuable experience, 
            helping buyers get tasks completed efficiently, and maintaining trust through 
            transparent transactions. We have consistently prioritized quality service and 
            long-term satisfaction. By keeping a human-first approach and leveraging technology, 
            we continue to support our community and foster growth for both workers and buyers.
          </motion.p>
        )}

        <div className="text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-indigo-600 font-semibold mt-2 underline hover:text-indigo-800 transition"
          >
            {showMore ? "Read Less" : "Read More"}
          </button>
        </div>
      </section>
       <section className="py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
         Start Earning Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg"
        >
          Appreciate every micro task you complete! Each small step brings you closer to
          your rewards and builds your experience. Your efforts make a difference, and
          we celebrate every achievement.
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg font-medium"
        >
          Join Now
        </motion.button>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-indigo-600 font-semibold"
        >
         Don’t miss out!
        </motion.div>
      </section>
    </div>
  );
};

export default OurJourney;

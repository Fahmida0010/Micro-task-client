import React from "react";
import { motion } from "framer-motion";
import banner1 from "../../assets/images/young.jpg"
import banner2 from "../../assets/images/biophilic.jpg"

const HowItWorks = () => {
  return (
    <div className="bg-gray-50">
      {/* Heading */}
      <section className="py-8 ">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ⚙ How It Works
          </h2>
          <p className="text-gray-600">
            Start earning in just a few simple steps
          </p>
        </div>
      </section>

      {/* Banner 1 */}
      <section className="py-8 p-2">
        <div className="max-w-6xl mx-auto px-4 
        flex flex-col md:flex-row items-center gap-8">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h3 className="text-2xl md:text-3xl 
  text-green-500 font-bold mb-4">Register Easily</h3>
            <p className="text-gray-800 mb-6">
                Create your free account in just a few seconds using your email or Google. 
  It’s quick, simple, and completely secure. Once registered, you can start 
  exploring available micro-tasks immediately, earning rewards at your own pace. 
  Our platform ensures your data is protected with the latest security measures, 
  giving you peace of mind while you focus on completing tasks. 
  Joining is hassle-free and designed to help you maximize your productivity from day one.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <img
              src={banner1}
              alt="Register Banner"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Banner 2 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-8">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h3 className="text-2xl  text-green-500 md:text-3xl font-bold mb-4">Complete Tasks & Earn</h3>
            <p className="text-gray-800 mb-6">
               Choose from a variety of simple and rewarding tasks that you can complete anytime, 
  anywhere, using your computer or mobile device. Each task is designed to be quick 
  and straightforward, allowing you to earn virtual coins effortlessly. Once completed, 
  your tasks are approved promptly, and rewards are credited instantly, so you can 
  see your progress in real-time. This flexible approach empowers you to manage your 
  work on your own schedule while steadily building up your earnings. Every small task 
  brings you closer to your goals and adds value to your experience.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <img
              src={banner2}
              alt="Tasks Banner"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

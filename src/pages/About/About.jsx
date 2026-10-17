"use client";

import { FaBriefcase, FaUserTie, FaShieldAlt, FaCoins, FaHandHoldingUsd, FaBell, FaCheckCircle } from "react-icons/fa";



const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
     

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* 1. Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs uppercase font-extrabold px-3 py-1 rounded-full tracking-wider">
            About MicroTask
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-6 tracking-tight text-gray-900 dark:text-white">
            Empowering Micro-Tasks, <span className="text-indigo-600 dark:text-indigo-400">Maximizing Earnings.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Inspired by platforms like Picoworkers and Clickworker, MicroTask is a next-generation ecosystem connecting ambitious workers with global buyers through secure transactions and seamless task management.
          </p>
        </div>

        {/* 2. Business Logic & Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 text-center hover:transform hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 shadow-inner">
              <FaCoins />
            </div>
            <h3 className="text-xl font-bold mb-3">Buyer Package</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Buyers can easily purchase coins via Stripe integration at a standard rate of <strong className="text-indigo-600 dark:text-indigo-400">10 Coins = $1</strong> to post tasks seamlessly.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 text-center hover:transform hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 shadow-inner">
              <FaHandHoldingUsd />
            </div>
            <h3 className="text-xl font-bold mb-3">Worker Withdrawal</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Workers complete tasks, earn coins, and request fast withdrawals through a fair conversion rate of <strong className="text-emerald-600 dark:text-emerald-400">20 Coins = $1</strong>.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 text-center hover:transform hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 shadow-inner">
              <FaBell />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Notifications</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Real-time alert system notifies workers on task approvals/rejections and alerts buyers upon submissions instantly.
            </p>
          </div>
        </div>

        {/* 3. Role Based Capabilities Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Designed for Every Role</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Tailored dashboards and tools for distinct user experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Worker Role */}
            <div className="bg-white dark:bg-gray-900 p-7 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl text-xl">
                  <FaBriefcase />
                </span>
                <h4 className="text-xl font-bold">Worker</h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Browse & filter available tasks</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Submit task proofs with ease</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Earn coins & withdraw earnings</li>
              </ul>
            </div>

            {/* Buyer Role */}
            <div className="bg-white dark:bg-gray-900 p-7 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl text-xl">
                  <FaUserTie />
                </span>
                <h4 className="text-xl font-bold">Buyer</h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Create and manage custom tasks</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Review worker submissions efficiently</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Secure coin top-ups via Stripe</li>
              </ul>
            </div>

            {/* Admin Role */}
            <div className="bg-white dark:bg-gray-900 p-7 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-xl text-xl">
                  <FaShieldAlt />
                </span>
                <h4 className="text-xl font-bold">Admin</h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Complete user & role management</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Monitor global platform analytics</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-indigo-500 flex-shrink-0" /> Approve payout & withdrawal requests</li>
              </ul>
            </div>

          </div>
        </div>

      
      

      </main>

    

    </div>
  );
};

export default About;
import React from "react";
import { 
  FaTasks, 
  FaPaperPlane, 
  FaCoins, 
  FaWallet, 
  FaBell, 
  FaCheckCircle 
} from "react-icons/fa";

const WorkerExperience = () => {
  const workerSteps = [
    {
      id: "01",
      title: "Explore & View Tasks",
      description:
        "Browse through a wide variety of available micro-tasks posted by buyers and pick the ones you like.",
      icon: <FaTasks className="text-blue-500 text-2xl" />,
      badgeColor: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    },
    {
      id: "02",
      title: "Submit for Review",
      description:
        "Complete the task instructions carefully, attach proof of work, and submit it directly to the buyer for review.",
      icon: <FaPaperPlane className="text-purple-500 text-2xl" />,
      badgeColor: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    },
    {
      id: "03",
      title: "Earn & Withdraw",
      description:
        "Get instant coins upon task approval. Convert your earnings easily (20 Coins = $1) and request secure withdrawals.",
      icon: <FaCoins className="text-amber-500 text-2xl" />,
      badgeColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
    },
  ];

  const workerPerks = [
    {
      title: "Instant Notifications",
      text: "Stay updated instantly when your task is approved ✅ or rejected ❌.",
      icon: <FaBell className="text-pink-500 text-xl" />,
    },
    {
      title: "Secure Payouts",
      text: "Get notified by admins 💸 the moment your withdrawal request is approved.",
      icon: <FaWallet className="text-green-500 text-xl" />,
    },
    {
      title: "Flexible Working",
      text: "Work anytime, anywhere, and build up your earnings at your own pace.",
      icon: <FaCheckCircle className="text-indigo-500 text-xl" />,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase 
           bg-green-100 dark:bg-green-950/80 text-green-600 dark:text-green-400 ">
            For Workers & Earners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
            Simple Steps to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Earn & Grow With Us
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Complete simple tasks, earn coins with fair rates (20 Coins = $1), and withdraw your earnings smoothly.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {workerSteps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${step.badgeColor} shadow-sm`}>
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-gray-200 dark:text-gray-800 group-hover:text-green-500/20 transition-colors">
                    {step.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center text-xs font-semibold text-green-600 dark:text-green-400">
                <span>Verified & Reliable</span>
              </div>
            </div>
          ))}
        </div>

        {/* Perks & Notification Highlights */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workerPerks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl flex-shrink-0">
                  {perk.icon}
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg mb-1 text-gray-100">
                    {perk.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {perk.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkerExperience;
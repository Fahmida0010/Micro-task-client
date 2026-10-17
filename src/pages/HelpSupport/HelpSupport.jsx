import { useState } from "react";
import { FaQuestionCircle, FaBook, FaHeadset, FaChevronDown, FaChevronUp } from "react-icons/fa";

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How do I earn coins as a Worker?",
      a: "You can earn coins by completing active tasks assigned by buyers, such as watching videos, participating in surveys, or performing social media interactions. Once approved, coins are added to your balance."
    },
    {
      q: "What is the conversion rate of coins to USD?",
      a: "For Workers, 20 coins equals $1 USD. For Buyers, purchasing coins is structured as 10 coins equals $1 USD."
    },
    {
      q: "How do I withdraw my earnings?",
      a: "Go to your Dashboard, navigate to the Withdrawal section, and submit a withdrawal request once you reach the minimum required balance."
    },
    {
      q: "Why was my task submission rejected?",
      a: "Task submissions can be rejected by buyers if the proof provided does not meet the task requirements or instructions specified."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">


      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs uppercase font-extrabold px-3 py-1 rounded-full tracking-wider">
            Help Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-6 tracking-tight text-gray-900 dark:text-white">
            How Can We <span className="text-indigo-600 dark:text-indigo-400">Help You?</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Find answers to common questions, explore platform guides, or get in touch with our support team.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center text-xl mx-auto mb-4">
              <FaBook />
            </div>
            <h3 className="font-bold text-lg mb-2">Platform Guides</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Learn how to navigate through buyer and worker dashboards effortlessly.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center text-xl mx-auto mb-4">
              <FaQuestionCircle />
            </div>
            <h3 className="font-bold text-lg mb-2">FAQs</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Check detailed answers regarding task approvals, coins, and payments.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center text-xl mx-auto mb-4">
              <FaHeadset />
            </div>
            <h3 className="font-bold text-lg mb-2">Direct Support</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Reach out directly via our contact page for personalized assistance.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-4 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
};

export default HelpSupport;
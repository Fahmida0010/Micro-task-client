import { motion } from "framer-motion";
import workers from "../../data/workers";
import { FaCrown, FaStar } from "react-icons/fa";

const BestWorkers = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4 shadow-sm">
            <FaStar className="text-amber-400" /> Top Performers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recognizing Our Best Workers 🌟
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Discover the most dedicated contributors leading our platform with exceptional performance.
          </p>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.slice(0, 6).map((worker, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Rank Badge for Top 3 */}
              {i < 3 && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold">
                  <FaCrown className="text-amber-500" /> #{i + 1}
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                {/* Avatar with Glow Ring */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
                  <img
                    src={worker.photo}
                    alt={worker.name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-md"
                  />
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {worker.name}
                </h3>

                {/* Role / Subtitle */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Top Task Contributor
                </p>

                {/* Coin Badge */}
                <div className="mt-5 w-full py-2.5 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center gap-2">
                  <span className="text-base">💰</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm sm:text-base">
                    {worker.coins} Coins Earned
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestWorkers;
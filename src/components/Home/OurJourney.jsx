import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const highlights = [
  {
    icon: <FaUsers />,
    title: "Community First",
    description: "Creating opportunities for workers and buyers.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Trust & Transparency",
    description: "Building confidence through reliable transactions.",
  },
  {
    icon: <FaChartLine />,
    title: "Continuous Growth",
    description: "Improving the platform for a better experience.",
  },
];

const OurJourney = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="relative overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-400/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[45%] h-80 w-80 rounded-full bg-violet-400/10 blur-[100px]"
      />

      {/* Our Journey */}
      <section className="relative z-10 mx-auto mb-16 max-w-6xl px-4 sm:px-6 lg:mb-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              <FaRocket />
              Our Story, Our Mission
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Every Small Task.
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
                A Bigger Opportunity.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              Our micro-task platform is built around a simple idea: make
              online earning opportunities accessible while helping buyers
              get their work done efficiently.
            </motion.p>

            <AnimatePresence initial={false}>
              {showMore && (
                <motion.div
                  key="journey-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="pt-5">
                    <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                      We continue to improve the experience for both workers
                      and buyers through accessible tools, a focus on quality,
                      and a commitment to making every interaction smoother.
                      Our goal is to build a community where small tasks can
                      create meaningful opportunities.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setShowMore((previous) => !previous)}
              aria-expanded={showMore}
              className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 active:translate-y-0 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {showMore ? "Show Less" : "Discover Our Story"}
              <motion.span
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <FaArrowRight className="-rotate-45 text-sm" />
              </motion.span>
            </button>
          </div>

          {/* Right content: feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-500/15 to-purple-500/15 blur-xl" />

            <div className="relative space-y-4 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20 sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    What drives us
                  </p>
                  <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                    Built for Everyone
                  </h3>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                  <FaRocket />
                </div>
              </div>

              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.12 }}
                  className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-indigo-100 hover:bg-indigo-50/70 dark:hover:border-indigo-400/10 dark:hover:bg-indigo-400/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-400/10 dark:text-indigo-400">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  <FaCheckCircle className="mt-1 shrink-0 text-sm text-emerald-500 opacity-70" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    
    </main>
  );
};

export default OurJourney;

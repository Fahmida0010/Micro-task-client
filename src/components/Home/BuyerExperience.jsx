import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPlusCircle,
  FaUserCheck,
  FaCheckDouble,
  FaCoins,
  FaShieldAlt,
  FaRocket,
  FaArrowRight,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Import Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const steps = [
  {
    id: "01",
    title: "Create a task",
    description:
      "Describe your work, choose the number of workers, and set your budget in minutes.",
    icon: FaPlusCircle,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-500/15",
    tag: "START HERE",
  },
  {
    id: "02",
    title: "Get real results",
    description:
      "Workers complete your task and submit proof for you to review easily.",
    icon: FaUserCheck,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-500/15",
    tag: "IN PROGRESS",
  },
  {
    id: "03",
    title: "Review & approve",
    description:
      "Verify submissions and approve valid work. Workers receive their rewards instantly.",
    icon: FaCheckDouble,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    tag: "COMPLETED",
  },
  {
    id: "04",
    title: "Automated payouts",
    description:
      "Coins are deducted seamlessly and sent to workers with full transparent tracking.",
    icon: FaCoins,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-500/15",
    tag: "SMOOTH PAYMENTS",
  },
];

const highlights = [
  {
    icon: FaCoins,
    title: "Flexible payments",
    text: "Recharge coins and control your campaign budget.",
  },
  {
    icon: FaShieldAlt,
    title: "Quality control",
    text: "Review submissions before approving completed work.",
  },
  {
    icon: FaRocket,
    title: "Built for speed",
    text: "Launch micro-tasks and track progress in one place.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const BuyerExperience = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] px-4 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#09090f] dark:text-white sm:px-6 lg:px-8 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-violet-300/20 blur-[100px] dark:bg-violet-600/10" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px] dark:bg-cyan-500/10" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-slate-200/80 bg-white px-3.5 py-2 text-sm font-bold text-violet-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-violet-300 rounded-full">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              For buyers & businesses
            </div>

            <h2 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-7xl">
              Less busywork.
              <br />
              <span className="text-violet-600 dark:text-violet-400">
                More done.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
              Your goals, your budget, your rules. Get everyday tasks done
              through a simple, continuous, and transparent workflow.
            </p>
          </div>

          {/* Carousel Navigation Buttons & Badge */}
          <div className="flex items-center justify-between md:flex-col md:items-end md:gap-4">
            <div className="hidden shrink-0 items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400 md:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
                <FaCheck className="text-emerald-500" />
              </span>
              Simple from start to finish
            </div>

            {/* Custom Carousel Arrows */}
            <div className="flex items-center gap-2">
              <button
                ref={prevRef}
                aria-label="Previous Slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-violet-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-violet-600 dark:hover:text-white cursor-pointer active:scale-95"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                ref={nextRef}
                aria-label="Next Slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-violet-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-violet-600 dark:hover:text-white cursor-pointer active:scale-95"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Continuous Autoplay Carousel Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-14 pt-2 !overflow-visible"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <SwiperSlide key={step.id} className="h-auto">
                  <motion.article
                    variants={itemVariants}
                    whileHover={{ y: -7 }}
                    className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-colors duration-300 hover:border-violet-300 hover:shadow-[0_20px_55px_rgba(109,40,217,0.10)] dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-violet-500/40 sm:p-8"
                  >
                    {/* Large background number */}
                    <span className="pointer-events-none absolute -right-1 top-0 text-[110px] font-black leading-none tracking-tighter text-slate-100 transition-colors duration-300 group-hover:text-violet-100/80 dark:text-white/[0.035] dark:group-hover:text-violet-500/[0.08]">
                      {step.id}
                    </span>

                    <div className="relative z-10 flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bg} ${step.color} transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110`}
                      >
                        <Icon className="text-2xl" />
                      </div>

                      <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                        STEP {step.id}
                      </span>
                    </div>

                    <div className="relative z-10 mt-10 flex-1">
                      <span className="text-[10px] font-bold tracking-[0.18em] text-violet-600 dark:text-violet-400">
                        {step.tag}
                      </span>

                      <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-7 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/[0.08]">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {index === 0
                          ? "Quick setup"
                          : index === 1
                          ? "Track progress"
                          : index === 2
                          ? "Stay in control"
                          : "Instant updates"}
                      </span>

                      <motion.span
                        whileHover={{ x: 4 }}
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${step.bg} ${step.color}`}
                      >
                        <FaArrowRight className="text-sm" />
                      </motion.span>
                    </div>
                  </motion.article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

        {/* Bottom feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.035] lg:mt-8"
        >
          <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.45 }}
                  className="flex gap-4 p-6 sm:p-7"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/[0.07] dark:text-violet-300">
                    <Icon className="text-lg" />
                  </div>

                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Closing note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-xs font-medium tracking-wide text-slate-500 dark:text-slate-500"
        >
          AUTOMATED WORKFLOW <span className="mx-2">·</span> TRANSPARENT
          APPROVALS <span className="mx-2">·</span> BETTER CONTROL
        </motion.p>
      </div>
    </section>
  );
};

export default BuyerExperience;
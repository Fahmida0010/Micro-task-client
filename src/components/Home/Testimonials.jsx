import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import testimonials from "../../data/testimonials";
import "swiper/css";

// Dark mode compatible subtle accent borders and badge colors
const cardAccents = [
  "border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
  "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  "border-amber-500/30 text-amber-600 dark:text-amber-400",
  "border-pink-500/30 text-pink-600 dark:text-pink-400",
  "border-purple-500/30 text-purple-600 dark:text-purple-400",
  "border-blue-500/30 text-blue-600 dark:text-blue-400",
  "border-teal-500/30 text-teal-600 dark:text-teal-400",
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4 shadow-sm">
            💬 Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Users Say
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Read authentic feedback from community members completing tasks and growing with us.
          </p>
        </div>

        {/* Testimonials Slider */}
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {testimonials.slice(0, 7).map((t, i) => {
            const accentClass = cardAccents[i % cardAccents.length];
            return (
              <SwiperSlide key={i} className="h-auto py-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`h-full flex flex-col justify-between p-7 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all duration-300 relative group`}
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className={`text-2xl mb-4 opacity-40 group-hover:opacity-100 transition-opacity ${accentClass.split(' ')[1]}`} />

                  {/* Quote Text */}
                  <p className="text-slate-700 dark:text-slate-300 italic text-base leading-relaxed flex-1">
                    “{t.quote}”
                  </p>

                  {/* User Profile */}
                  <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/20 dark:border-indigo-400/30 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                        {t.name}
                      </h4>
                      <span className={`text-xs font-medium ${accentClass.split(' ').slice(1).join(' ')}`}>
                        Verified User
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
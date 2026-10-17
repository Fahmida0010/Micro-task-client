
import { motion } from "framer-motion";
import { FaShieldAlt, FaBolt, FaHandshake} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-2xl text-indigo-500 dark:text-indigo-400" />,
    iconBg: "bg-indigo-100 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/50",
    title: "Secure System",
    description: "Your data and earnings are protected with advanced security and encrypted transactions.",
    badge: "Encrypted",
    accentColor: "from-indigo-500 to-purple-500",
  },
  {
    icon: <FaBolt className="text-2xl text-amber-500 dark:text-amber-400" />,
    iconBg: "bg-amber-100 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/50",
    title: "Fast Payments",
    description: "Complete tasks and receive rewards quickly with our efficient approval and payment process.",
    badge: "Instant",
    accentColor: "from-amber-400 to-emerald-500",
  },
  {
    icon: <FaHandshake className="text-2xl text-emerald-500 dark:text-emerald-400" />,
    iconBg: "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/50",
    title: "Trusted by Users",
    description: "Thousands of users trust our platform for reliable tasks, transparent earnings, and friendly support.",
    badge: "Verified",
    accentColor: "from-emerald-400 to-teal-500",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Glow (Dark Mode Visual Effect) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4 shadow-sm"
          >
            ✨ Why Choose Us
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Designed for Your Success & Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg"
          >
            We provide a secure, fast, and trusted platform designed to help you earn with confidence and ease.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              className="relative group bg-white dark:bg-slate-900/90 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${feature.accentColor} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 rounded-full pointer-events-none`} />

              <div>
                {/* Header inside Card */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl border shadow-sm ${feature.iconBg}`}>
                    {feature.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {feature.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Decorative Indicator Bar */}
              <div className={`mt-8 h-1 w-12 rounded-full bg-gradient-to-r ${feature.accentColor} group-hover:w-full transition-all duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
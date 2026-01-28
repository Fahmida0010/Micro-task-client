import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import testimonials from "../../data/testimonials";
import "swiper/css";

// Optional: assign colors to cards
const cardColors = [
  "bg-indigo-300 text-indigo-800",
  "bg-green-300 text-green-800",
  "bg-yellow-200 text-yellow-800",
  "bg-pink-200 text-pink-800",
  "bg-purple-300 text-purple-800",
  "bg-blue-300 text-blue-800",
  "bg-emerald-300 text-emerald-800",
];

const Testimonials = () => {
  return (
    <section className="bg-purple-100 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        💬 What Users Say
      </h2>

      <Swiper
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
        loop
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {testimonials.slice(0, 7).map((t, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              // Add dynamic color here
              className={`h-full p-6 rounded-xl shadow text-center ${cardColors[i % cardColors.length]}`}
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-16 h-16 mx-auto rounded-full object-cover"
              />
              <p className="mt-4 italic">{`“${t.quote}”`}</p>
              <h4 className="mt-3 font-semibold">{t.name}</h4>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;

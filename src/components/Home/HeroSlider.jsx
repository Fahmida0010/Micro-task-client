import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

const slides = [
  {
    title: "Earn Money Online",
    subtitle: "Complete simple tasks & earn coins",
  },
  {
    title: "Post Tasks Easily",
    subtitle: "Hire workers worldwide in minutes",
  },
  {
    title: "Secure & Trusted Platform",
    subtitle: "Fast payment & transparent system",
  },
];

const HeroSlider = () => {
  return (
    <Swiper autoplay={{ delay: 3000 }} modules={[Autoplay]}>
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="h-[70vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold">{slide.title}</h1>
              <p className="mt-4 text-xl">{slide.subtitle}</p>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;

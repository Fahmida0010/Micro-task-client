import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import slide1 from "../../assets/images/job.jpg";
import slide2 from "../../assets/images/need.jpg";
import slide3 from "../../assets/images/scenery.jpg";
         

const slides = [
  {
    title: "Earn Money Online",
    subtitle: "Complete simple tasks & earn coins",
      image: slide1,
  },
  {
    title: "Post Tasks Easily",
    subtitle: "Hire workers worldwide in minutes",
      image: slide2,
  },
  {
    title: "Secure & Trusted Platform",
    subtitle: "Fast payment & transparent system",
      image: slide3,
  },
];

const HeroSlider = () => {
  return (
  
<Swiper autoplay={{ delay: 3000 }} modules={[Autoplay]} loop>
  {slides.map((slide, i) => (
    <SwiperSlide key={i}>
      <div
        className="h-[70vh] flex items-center justify-center bg-cover bg-center text-white relative"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center z-10"
        >
          <h1 className="text-6xl text-yellow-500 font-bold">{slide.title}</h1>
          <p className="mt-4 text-green-500 text-2xl">{slide.subtitle}</p>
        </motion.div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>


  );
};

export default HeroSlider;

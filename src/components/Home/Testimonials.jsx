import { Swiper, SwiperSlide } from "swiper/react";
import testimonials from "../../data/testimonials";
import "swiper/css";

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        💬 What Users Say
      </h2>

      <Swiper slidesPerView={1} autoplay={{ delay: 4000 }}>
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="max-w-xl mx-auto text-center p-6">
              <img
                src={t.photo}
                className="w-16 h-16 mx-auto rounded-full"
              />
              <p className="mt-4 italic">"{t.quote}"</p>
              <h4 className="mt-2 font-semibold">{t.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;

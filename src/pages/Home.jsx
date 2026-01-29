import BestWorkers from "../components/Home/BestWorkers";
import HeroSlider from "../components/home/HeroSlider";
import HowItWorks from "../components/Home/HowItWorks";
import OurJourney from "../components/Home/OurJourney";
import Testimonials from "../components/Home/Testimonials";
import WhyChooseUs from "../components/Home/WhyChooseUs";


const Home = () => {
  return (
    <>
      <HeroSlider />
      <BestWorkers />
      <Testimonials />
      <HowItWorks/>
      <WhyChooseUs/>
      <OurJourney/>
    </>
  );
};

export default Home;

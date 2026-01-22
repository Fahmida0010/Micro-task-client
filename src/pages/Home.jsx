import BestWorkers from "../components/Home/BestWorkers";
import ExtraSections from "../components/Home/ExtraSection";
import HeroSlider from "../components/home/HeroSlider";
import Testimonials from "../components/Home/Testimonials";


const Home = () => {
  return (
    <>
      <HeroSlider />
      <BestWorkers />
      <Testimonials />
      <ExtraSections />
    </>
  );
};

export default Home;

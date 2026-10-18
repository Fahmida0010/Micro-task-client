import BestWorkers from "../components/Home/BestWorkers";
import BuyerExperience from "../components/Home/BuyerExperience";
import FeaturedTasks from "../components/Home/FeaturedTasks";
import HeroSlider from "../components/Home/HeroSlider";
import HowItWorks from "../components/Home/HowItWorks";
import OurJourney from "../components/Home/OurJourney";
import RecentActivity from "../components/Home/RecentActivity";
import Testimonials from "../components/Home/Testimonials";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import WorkerExperience from "../components/Home/WorkerExperience";


const Home = () => {
  return (
    <>
      <HeroSlider />
      <BestWorkers />
      <Testimonials />
      <FeaturedTasks/>
      <HowItWorks/>
      <RecentActivity/>
      <WhyChooseUs/>
      <BuyerExperience/>
      <WorkerExperience/>
      <OurJourney/>

    </>
  );
};

export default Home;

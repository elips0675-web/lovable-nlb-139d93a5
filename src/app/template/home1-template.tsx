import { Hero1 } from "../components/hero1";
import Partners from "../components/partners";
import Services1 from "../components/services1";
import AboutUs from "../components/about-us";
import WhyChooseUs from "../components/why-choose-us";
import Projects from "../components/projects";
import Testimonials from "../components/testimonials";
import ContactUs from "../components/contact-us";
import Footer from "../components/footer";

const Home1Template = () => {
  return (
    <div>
      <Hero1 />
      <Partners />
      <Services1 />
      <AboutUs />
      <WhyChooseUs />
      <Projects />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home1Template;

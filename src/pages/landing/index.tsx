import Hero from "./components/Hero";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";
import BusinessProcess from "./components/BusinessProcess";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
export default function LandingPage() {
  return (
    <div>
      <div className="sticky top-8 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 overflow-x-hidden z-100">
        <Header />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 overflow-x-hidden">
        <div id="home">
          <Hero />
        </div>
      </div>

      <div className=" outline-1 outline-green-500 overflow-x-hidden" id="about">
        <AboutSection />
      </div>

      <div className=" outline-1 outline-blue-500 overflow-x-hidden" id="services">
        <ServiceSection />
      </div>

      <div className=" outline-1 outline-yellow-500 overflow-x-hidden" id="process">
        <BusinessProcess />
      </div>

      <div className=" outline-1 outline-purple-500 overflow-x-hidden" id="testimonials">
        <Testimonials />
      </div>

      <div className=" outline-1 outline-orange-500 overflow-x-hidden" id="footer">
        <Footer />
      </div>
    </div>
  );
}


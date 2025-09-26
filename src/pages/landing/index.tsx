import Hero from "./components/Hero";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";
import BusinessProcess from "./components/BusinessProcess";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
export default function LandingPage() {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16overflow-x-hidden">
        <Header />
        <Hero />
      </div>

      <div className="outline outline-1 outline-green-500 overflow-x-hidden">
        <AboutSection />
      </div>

      <div className="outline outline-1 outline-blue-500 overflow-x-hidden">
        <ServiceSection />
      </div>

      <div className="outline outline-1 outline-yellow-500 overflow-x-hidden">
        <BusinessProcess />
      </div>

      <div className="outline outline-1 outline-purple-500 overflow-x-hidden">
        <Testimonials />
      </div>

      <div className="outline outline-1 outline-orange-500 overflow-x-hidden">
        <Footer />
      </div>
    </>
  );
}


import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";
import BusinessProcess from "./components/BusinessProcess";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setScrolled(window.scrollY > heroHeight - 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Header scrolled={scrolled} />

      <div className="w-full px-4 md:px-8 lg:px-16 overflow-x-hidden">
        <div id="home">
          <Hero />
        </div>
      </div>

      <div className="overflow-x-hidden" id="about">
        <AboutSection />
      </div>

      <div className="overflow-x-hidden" id="services">
        <ServiceSection />
      </div>

      <div className="overflow-x-hidden" id="process">
        <BusinessProcess />
      </div>

      <div className="overflow-x-hidden" id="testimonials">
        <Testimonials />
      </div>

      <div className="overflow-x-hidden" id="footer">
        <Footer />
      </div>
    </div>
  );
}

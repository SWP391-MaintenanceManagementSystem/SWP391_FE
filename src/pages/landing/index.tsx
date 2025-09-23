import Hero from "./components/Hero";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";

export default function LandingPage() {
  return (
    <>
      <div className="mx-11 my-8">
        <Header />
        <Hero />
      </div>
      <AboutSection />
      <ServiceSection />
    </>
  ); 
}    

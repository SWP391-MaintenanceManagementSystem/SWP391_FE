import { ArrowUpRight } from "lucide-react";
import logo from "/logo.svg";
import logoDark from "/logo-light.svg";
import MobileNavMenu from "./MobileNavMenu";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white flex items-center justify-between p-2 sm:p-4 rounded-md sm:rounded-[10px] shadow-sm w-full z-50 dark:bg-black ">
      {/* Logo */}
      <img src={logo} className="w-20 sm:w-24 lg:w-28 dark:hidden" />
      <img 
    src={logoDark} 
    alt="logo dark" 
    className="w-20 sm:w-24 lg:w-28 hidden dark:block" 
  />
      
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <MobileNavMenu />
      </div>

      {/* Desktop Nav */}
     <nav className="hidden lg:flex justify-center gap-x-6 items-center text-purple-primary font-medium">
  <a href="#home" className="relative group hover:text-purple-primary transition">
    Home
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-primary transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#about" className="relative group hover:text-purple-primary transition">
    About us
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-primary transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#services" className="relative group hover:text-purple-primary transition">
    Service
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-primary transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#process" className="relative group hover:text-purple-primary transition">
    How it works
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-primary transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#testimonials" className="relative group hover:text-purple-primary transition">
    Testimonials
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-primary transition-all duration-300 group-hover:w-full"></span>
  </a>
</nav>


      {/* Desktop Button */}
      <div className="hidden lg:block">
        <NavLink
          to="/login"
          className="flex gap-x-1 items-center justify-center 
             bg-purple-primary px-6 py-[18px] w-[115px] h-14 
             rounded-md text-white hover:bg-purple-700 dark:text-amber-primary"
        >
          Login
          <ArrowUpRight />
        </NavLink>
      </div>
    </header>
  );
}
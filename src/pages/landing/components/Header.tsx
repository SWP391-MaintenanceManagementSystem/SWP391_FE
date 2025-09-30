import { ArrowUpRight } from "lucide-react";
import logo from "/logo.svg";
import MobileNavMenu from "./MobileNavMenu";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white flex items-center justify-between p-2 sm:p-4 rounded-md sm:rounded-[10px] shadow-sm w-full z-50 ">
      {/* Logo */}
      <img src={logo} className="w-20 sm:w-24 lg:w-28" />

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <MobileNavMenu />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex justify-center gap-x-6 items-center text-gray-800 font-medium">
        <a href="#home" className="hover:text-purple-primary transition">Home</a>
        <a href="#about" className="hover:text-purple-primary transition">About us</a>
        <a href="#services" className="hover:text-purple-primary transition">Service</a>
        <a href="#process" className="hover:text-purple-primary transition">How it works</a>
        <a href="#testimonials" className="hover:text-purple-primary transition">Testimonials</a>
      </nav>

      {/* Desktop Button */}
      <div className="hidden lg:block">
        <NavLink
          to="/login"
          className="flex gap-x-1 items-center justify-center 
             bg-purple-primary px-6 py-[18px] w-[115px] h-14 
             rounded-md text-white hover:bg-purple-700"
        >
          Login
          <ArrowUpRight />
        </NavLink>
      </div>
    </header>
  );
}
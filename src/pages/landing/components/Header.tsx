import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import logo from "/logo.svg";
import MobileNavMenu from "./MobileNavMenu";

export default function Header() {
  return (
    <header className="bg-white flex items-center justify-between p-2 sm:p-4 rounded-md sm:rounded-[10px] shadow-sm w-full z-50">
      {/* Logo */}
      <img src={logo} className="w-20 sm:w-24 lg:w-28" />

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <MobileNavMenu />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex justify-center gap-x-6 items-center text-gray-800 font-medium">
        <span className="cursor-pointer hover:text-purple-primary transition">Home</span>
        <span className="cursor-pointer hover:text-purple-primary transition">About us</span>
        <span className="cursor-pointer hover:text-purple-primary transition">Service</span>
        <span className="cursor-pointer hover:text-purple-primary transition">How it works</span>
        <span className="cursor-pointer hover:text-purple-primary transition">Testimonials</span>
      </nav>

      {/* Desktop Button */}
      <div className="hidden lg:block">
        <Button className="!bg-purple-primary !px-6 !py-[18px] !w-[115px] h-14">
          Login
          <ArrowUpRight />
        </Button>
      </div>
    </header>
  );
}
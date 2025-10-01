import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function MobileNavMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-9 h-9  flex items-center  justify-center  rounded-md hover:bg-gray-100 transition !bg-purple-primary">
          <Menu size={20} className=" text-white dark:text-amber-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-white px-6 py-8 rounded-l-2xl shadow-xl border-l border-gray-200 z-100 dark:bg-black dark:border-"
      >
        <nav className="flex flex-col gap-6 mt-8 text-lg font-medium text-gray-700">
          <span className="cursor-pointer hover:text-purple-primary transition dark:text-purple-light ">
            Home
          </span>
          <span className="cursor-pointer hover:text-purple-primary transition dark:text-purple-light">
            About us
          </span>
          <span className="cursor-pointer hover:text-purple-primary transition dark:text-purple-light">
            Service
          </span>
          <span className="cursor-pointer hover:text-purple-primary transition dark:text-purple-light">
            How it works
          </span>
          <span className="cursor-pointer hover:text-purple-primary transition dark:text-purple-light">
            Testimonials
          </span>
        </nav>
        <NavLink
          to="/login"
          className="w-full !bg-purple-primary !h-12 flex gap-x-1 items-center justify-center 
             bg-purple-primary px-6 py-[18px] w-[115px] h-14 
             rounded-md text-white hover:bg-purple-700 dark:text-amber-primary"
        >
          Login
          <ArrowUpRight />
        </NavLink>
      </SheetContent>
    </Sheet>
  );
}

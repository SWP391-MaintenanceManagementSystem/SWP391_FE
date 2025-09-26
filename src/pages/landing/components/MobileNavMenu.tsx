import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpRight, Menu } from "lucide-react";

export default function MobileNavMenu() {
  return (
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-9 h-9  flex items-center  justify-center  rounded-md hover:bg-gray-100 transition !bg-purple-primary">
            <Menu size={20} className=" text-white" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white px-6 py-8 rounded-l-2xl shadow-xl border-l border-gray-200"
        >
          <nav className="flex flex-col gap-6 mt-8 text-lg font-medium text-gray-700">
            <span className="cursor-pointer hover:text-purple-primary transition">
              Home
            </span>
            <span className="cursor-pointer hover:text-purple-primary transition">
              About us
            </span>
            <span className="cursor-pointer hover:text-purple-primary transition">
              Service
            </span>
            <span className="cursor-pointer hover:text-purple-primary transition">
              How it works
            </span>
            <span className="cursor-pointer hover:text-purple-primary transition">
              Testimonials
            </span>
          </nav>
          <div className="mt-10">
            <Button className="w-full !bg-purple-primary !h-12">
              Login
              <ArrowUpRight />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
  );
}

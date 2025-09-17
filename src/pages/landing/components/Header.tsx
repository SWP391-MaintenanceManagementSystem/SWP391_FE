import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import logo from "/logo.svg";

export default function Header() {
  return (
    <div className="bg-white h-fit flex items-center justify-around p-[18px] rounded-[10px]">
      <img src={logo} />
      <div className="flex justify-center gap-x-5 items-center">
        <span>Home</span>
        <span>About us</span>
        <span>Service</span>
        <span>How it works</span>
        <span>Testimonials</span>
      </div>
      <Button className="!bg-purple-primary !px-6 !py-[18px] !w-[115px] h-14">
        Login
        <ArrowUpRight />
      </Button>

    </div>
  );
}

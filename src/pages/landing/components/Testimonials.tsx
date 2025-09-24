import { Sparkles } from "lucide-react";
import avatar1 from "@/assets/avatar1.png";
import avatar2 from "@/assets/avatar2.png";
import FeedbackSlider from "./FeedbackSlider";

export type ContentFeedback = {
  name: string;
  role: string;
  image: string;
  text: string;
};

export default function Testimonials() {
  const testimonials: ContentFeedback[] = [
  {
    name: "Justus Menke",
    role: "CEO Eronaman",
    image: avatar1,
    text: "Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
  },
  {
    name: "Britain Eriksen",
    role: "CEO Universal",
    image: avatar2,
    text: "Accusamus et iusto odi ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
  },
  {
    name: "Sophia Liang",
    role: "Product Manager at TechNova",
    image: avatar1,
    text: "The platform has completely changed the way we handle projects. Smooth, intuitive, and powerful.",
  },
  {
    name: "Daniel Rossi",
    role: "CTO at GreenCloud",
    image: avatar1,
    text: "I was impressed with the customer support and the constant updates. Truly reliable and efficient.",
  },
  {
    name: "Amelia Johnson",
    role: "Marketing Director at Visionary Co.",
    image: avatar1,
    text: "It helped us streamline campaigns and gain real-time insights. Couldn’t imagine working without it now.",
  },
  {
    name: "Liam Patel",
    role: "Founder of InnovateX",
    image: avatar1,
    text: "The simplicity combined with advanced features makes it perfect for both startups and enterprises.",
  },
];


  return (
    <section className=" w-full py-32 bg-white ">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center ">
          <Sparkles className="w-5 h-5 text-purple-primary" />
          <span className="text-2xl text-purple-primary tracking-widest">
            TESTIMONIALS
          </span>
        </div>
        <span className="text-3xl font-extrabold">WHAT OUR CLIENTS SAYS </span>
      </div>
      <div className="w-full h-full ">
        <FeedbackSlider testimonials={testimonials} />
      </div>
    </section>
  );
}

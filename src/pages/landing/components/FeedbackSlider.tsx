import React from "react";
import Slider, { type Settings } from "react-slick";
import { MdOutlineStar } from "react-icons/md";
import type { ContentFeedback } from "./Testimonials";
import { Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export type FeedbackSliderProps = {
  testimonials: ContentFeedback[];
};

export default function FeedbackSlider({ testimonials }: FeedbackSliderProps) {
 const settings: Settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  

  customPaging: () => (
    <div className="w-8 h-0.5 bg-gray-400 transition-colors" />
  ),
  appendDots: (dots) => (
    <div>
      <ul className="flex justify-center gap-3 mt-4 [&_.slick-active>div]:bg-black">
        {dots}
      </ul>
    </div>
  ),
};


  return (
    <Slider {...settings} className="h-full">
      {testimonials.map((item, index) => (
        <div key={index} className="px-2">
          <div className="py-16">
            <div className="shadow-lg rounded-lg py-6 relative bg-white flex flex-col w-96 h-72 ">
              <div className="absolute -top-5 left-6 bg-black rounded-full w-10 h-10 flex items-center justify-center">
                <Quote className="text-white w-5 h-5" />
              </div>

              <div className="flex items-center my-7 px-6">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <MdOutlineStar key={i} className="text-yellow-400" />
                  ))}
              </div>

              <p className="text-gray-600 text-sm italic px-6">"{item.text}"</p>

              <div className="flex items-center gap-3 mt-auto border-t-1 px-6 pt-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="text-black font-semibold text-sm">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

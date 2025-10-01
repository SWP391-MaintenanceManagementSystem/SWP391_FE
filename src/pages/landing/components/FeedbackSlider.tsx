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

    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    customPaging: () => (
      <div className="w-8 h-0.5 bg-gray-400 transition-colors" />
    ),
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center gap-3 mt-4 [&_.slick-active>div]:bg-black dark:[&_.slick-active>div]:bg-purple-400">
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
            <div
              className="shadow-lg rounded-lg py-6 relative flex flex-col w-full h-auto min-h-[280px] 
                         max-w-sm mx-auto transition-colors
                         bg-white dark:bg-neutral-900 dark:shadow-md"
            >
              {/* Quote icon */}
              <div
                className="absolute -top-5 left-6 bg-black rounded-full w-10 h-10 flex items-center justify-center 
                           dark:bg-purple-500/20"
              >
                <Quote className="text-white w-5 h-5 dark:text-purple-400" />
              </div>

              {/* Stars */}
              <div className="flex items-center my-7 px-6">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <MdOutlineStar key={i} className="text-yellow-400" />
                  ))}
              </div>

              {/* Feedback text */}
              <p className="text-gray-600 text-sm italic px-6 dark:text-gray-300">
                "{item.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto border-t px-6 pt-5 border-gray-200 dark:border-neutral-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full ring-2 ring-purple-200 dark:ring-purple-500/40"
                />
                <div>
                  <h4 className="text-black font-semibold text-sm dark:text-white/90">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-xs dark:text-gray-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

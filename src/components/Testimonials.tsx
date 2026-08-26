"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Viezh Robert",
      location: "Warsaw, Poland",
      rating: 4.5,
      comment:
        "“Wow... I am very happy to use this service, it turned out to be more than my expectations and so far there have been no problems. SwiftRide always the best”.",
      avatarInitials: "VR",
    },
    {
      id: 2,
      name: "Yessica Christy",
      location: "Shanxi, China",
      rating: 4.8,
      comment:
        "“I like it because I like to travel far and still can rent a comfortable car seamlessly. The process was super smooth and reliable”.",
      avatarInitials: "YC",
    },
    {
      id: 3,
      name: "Kim Young Jou",
      location: "Seoul, South Korea",
      rating: 4.5,
      comment:
        "“This is very unusual for my business that requires high mobility and fast car rentals. Customer support is always responsive and helpful”.",
      avatarInitials: "KY",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="w-full bg-white py-20 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Heading - No uppercase */}
        <div className="text-center mb-16">
          <h2 className="font-rubik font-medium text-[#0b132a] text-3xl md:text-[35px] tracking-tight leading-[1.3] mb-4">
            Trusted by Thousands of <br className="hidden sm:inline" />
            Happy Customer
          </h2>
          <p className="text-[#596780] font-normal text-base md:text-lg max-w-[530px] mx-auto leading-[27px]">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Testimonials Cards Grid - Exact wireframe rounded-[10px] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-[10px] p-8 flex flex-col justify-between min-h-[230px] border transition-all duration-200 ${
                currentIndex === idx
                  ? "border-[#3563E9] shadow-lg"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {/* Header: User Profile & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* Exact wireframe w-10 h-10 rounded-[20px] */}
                  <div className="w-10 h-10 rounded-[20px] bg-[#3563E9]/10 text-[#3563E9] flex items-center justify-center font-bold text-sm">
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h3 className="font-rubik font-medium text-[#0b132a] text-lg leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-rubik font-normal text-[#4f5665] text-sm leading-tight block">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 font-rubik text-base text-[#0b132a]">
                  <span>{item.rating}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Quote */}
              <p className="font-rubik font-normal text-[#0b132a] text-base leading-[28px]">
                {item.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination & Arrow Controls */}
        <div className="flex items-center justify-between pt-4">
          {/* Pagination Indicators - exact wireframe rounded-[7.5px] */}
          <div className="flex items-center gap-3">
            <div className="w-[45px] h-[15px] bg-[#3563E9] rounded-[7.5px] transition-all"></div>
            <div className="w-[15px] h-[15px] bg-[#dde0e4] rounded-[7.5px]"></div>
            <div className="w-[15px] h-[15px] bg-[#dde0e4] rounded-[7.5px]"></div>
            <div className="w-[15px] h-[15px] bg-[#dde0e4] rounded-[7.5px]"></div>
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#3563E9] hover:bg-[#3563E9] hover:text-white text-[#0b132a] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#3563E9] hover:bg-[#3563E9] hover:text-white text-[#0b132a] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

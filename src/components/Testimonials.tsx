"use client";

import { useState } from "react";
import Image from "next/image";
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
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Yessica Christy",
      location: "Shanxi, China",
      rating: 4.8,
      comment:
        "“I like it because I like to travel far and still can rent a comfortable car seamlessly. The process was super smooth and reliable”.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Kim Young Jou",
      location: "Seoul, South Korea",
      rating: 4.5,
      comment:
        "“This is very unusual for my business that requires high mobility and fast car rentals. Customer support is always responsive and helpful”.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
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
        {/* Consistent Section Heading */}
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-3 sm:mb-4">
            Trusted by Thousands of Happy Customers
          </h2>
          <p className="text-[#596780] font-normal text-sm sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {reviews.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-[10px] p-6 sm:p-8 flex flex-col justify-between min-h-[240px] border transition-all duration-300 ${
                currentIndex === idx
                  ? "border-[#3563E9] shadow-[0px_10px_30px_rgba(53,99,233,0.12)] scale-[1.02]"
                  : "border-slate-200/80 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-300"
              }`}
            >
              {/* Header: User Profile Photo & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-[#3563E9]/20 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B132A] text-base sm:text-lg leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-[#596780] text-xs sm:text-sm font-medium block">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm sm:text-base font-bold text-[#0B132A]">
                  <span>{item.rating}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Quote */}
              <p className="text-[#0B132A] text-sm sm:text-base leading-[26px] sm:leading-[28px] font-normal">
                {item.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination & Arrow Controls */}
        <div className="flex items-center justify-between pt-4">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2.5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-[12px] rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-[40px] bg-[#3563E9]"
                    : "w-[12px] bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#3563E9] hover:bg-[#3563E9] hover:text-white text-[#0B132A] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#3563E9] hover:bg-[#3563E9] hover:text-white text-[#0B132A] flex items-center justify-center transition-all cursor-pointer active:scale-95"
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

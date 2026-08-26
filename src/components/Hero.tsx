"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [pickupCity, setPickupCity] = useState("Select your city");
  const [pickupDate, setPickupDate] = useState("Select your date");
  const [pickupTime, setPickupTime] = useState("Select your time");

  const [dropoffCity, setDropoffCity] = useState("Select your city");
  const [dropoffDate, setDropoffDate] = useState("Select your date");
  const [dropoffTime, setDropoffTime] = useState("Select your time");

  const cities = ["London, UK", "Manchester, UK", "Birmingham, UK", "Leeds, UK", "Liverpool, UK"];
  const times = ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "09:00 PM"];

  return (
    <section className="relative w-full h-[calc(100dvh-150px)] min-h-[500px] bg-[#3563E9] flex flex-col justify-between overflow-visible">
      {/* Background Graphic: Right Shape with Exact Wireframe Border-Radius */}
      <div className="absolute top-0 right-0 w-full lg:w-[50%] h-full bg-[#1E3A8A] lg:rounded-[63px_0px_0px_0px] z-0 flex items-center justify-center overflow-hidden">
        <div className="p-6 flex items-center justify-center opacity-95">
          <svg
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 text-white drop-shadow-md"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="15" y="15" width="210" height="210" rx="36" fill="white" />
            <circle cx="85" cy="85" r="24" fill="#3563E9" />
            <path
              d="M32 175L80 125C86 119 96 119 102 125L138 160L162 135C168 129 178 129 184 135L215 168V177C215 200 196 219 173 219H67C44 219 25 200 25 177V175H32Z"
              fill="#3563E9"
            />
          </svg>
        </div>
      </div>

      {/* Main Hero Left Content */}
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-16 pt-6 lg:pt-10 pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
        <div className="lg:col-span-6 space-y-4 lg:space-y-5">
          {/* Tagline - Normal case, no uppercase */}
          <p className="text-white/90 font-medium text-sm sm:text-base tracking-tight">
            100% Trusted Car rental platform in the UK
          </p>

          {/* Headline - Normal / Title case, no uppercase */}
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] tracking-tight leading-[1.18]">
            Fast and easy way to <br className="hidden sm:block" />
            rent a car
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 font-normal text-sm sm:text-base leading-[24px] sm:leading-[26px] max-w-[500px]">
            Our Car Rental online booking system designed to meet the specific needs of car rental
            business owners. This easy-to-use car rental software will let you manage.
          </p>

          {/* Action Buttons - wireframe rounded */}
          <div className="flex items-center gap-6 pt-2">
            <Link
              href="#booking"
              className="px-7 py-3 bg-white text-[#3563E9] font-semibold text-sm sm:text-base rounded shadow hover:bg-white/90 transition-all hover:scale-105"
            >
              Booking Now
            </Link>
            <Link
              href="#rental-details"
              className="text-white font-semibold text-sm sm:text-base hover:text-white/80 transition-colors"
            >
              See all cars
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Filter/Search Bar: 50% in Hero & 50% in section below, wireframe rounded-[10px] */}
      <div className="w-full absolute bottom-0 left-0 right-0 translate-y-1/2 z-30 px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto bg-white rounded-[10px] p-5 sm:p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Pick - Up Group */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#3563E9] rounded-full"></div>
                </div>
                <span className="font-semibold text-base text-[#1A202C]">Pick - Up</span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
                {/* Locations */}
                <div className="space-y-1">
                  <label className="block font-bold text-xs sm:text-sm text-[#1A202C]">Locations</label>
                  <div className="flex items-center justify-between text-xs text-[#596780] cursor-pointer">
                    <select
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="w-full bg-transparent focus:outline-none appearance-none pr-3 cursor-pointer font-medium text-xs text-[#1A202C]"
                    >
                      <option value="Select your city">Select your city</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 -ml-3 pointer-events-none text-[#596780] shrink-0" />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-1 border-l border-slate-200 pl-3 sm:pl-4">
                  <label className="block font-bold text-xs sm:text-sm text-[#1A202C]">Date</label>
                  <div className="flex items-center justify-between text-xs text-[#596780] cursor-pointer">
                    <input
                      type="date"
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-transparent focus:outline-none cursor-pointer font-medium text-xs text-[#1A202C]"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-1 border-l border-slate-200 pl-3 sm:pl-4">
                  <label className="block font-bold text-xs sm:text-sm text-[#1A202C]">Time</label>
                  <div className="flex items-center justify-between text-xs text-[#596780] cursor-pointer">
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-transparent focus:outline-none appearance-none pr-3 cursor-pointer font-medium text-xs text-[#1A202C]"
                    >
                      <option value="Select your time">Select your time</option>
                      {times.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 -ml-3 pointer-events-none text-[#596780] shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Drop - Off Group */}
            <div className="lg:col-span-5 space-y-3 lg:border-l lg:border-slate-200 lg:pl-8">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-200 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                </div>
                <span className="font-semibold text-base text-[#1A202C]">Drop - Off</span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
                {/* Locations */}
                <div className="space-y-1">
                  <label className="block font-bold text-xs sm:text-sm text-[#1A202C]">Locations</label>
                  <div className="flex items-center justify-between text-xs text-[#596780] cursor-pointer">
                    <select
                      value={dropoffCity}
                      onChange={(e) => setDropoffCity(e.target.value)}
                      className="w-full bg-transparent focus:outline-none appearance-none pr-3 cursor-pointer font-medium text-xs text-[#1A202C]"
                    >
                      <option value="Select your city">Select your city</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 -ml-3 pointer-events-none text-[#596780] shrink-0" />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-1 border-l border-slate-200 pl-3 sm:pl-4">
                  <label className="block font-bold text-xs sm:text-sm text-[#1A202C]">Date</label>
                  <div className="flex items-center justify-between text-xs text-[#596780] cursor-pointer">
                    <input
                      type="date"
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="w-full bg-transparent focus:outline-none cursor-pointer font-medium text-xs text-[#1A202C]"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-1 border-l border-slate-200 pl-3 sm:pl-4">
                  <label className="block font-bold text-xs sm:text-sm text-[#1A202C]">Time</label>
                  <div className="flex items-center justify-between text-xs text-[#596780] cursor-pointer">
                    <select
                      value={dropoffTime}
                      onChange={(e) => setDropoffTime(e.target.value)}
                      className="w-full bg-transparent focus:outline-none appearance-none pr-3 cursor-pointer font-medium text-xs text-[#1A202C]"
                    >
                      <option value="Select your time">Select your time</option>
                      {times.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 -ml-3 pointer-events-none text-[#596780] shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button - wireframe rounded */}
            <div className="lg:col-span-2 flex justify-end">
              <button
                type="button"
                className="w-full lg:w-[110px] h-[44px] bg-[#3563E9] hover:bg-[#254EDB] text-white font-semibold text-base rounded shadow flex items-center justify-center transition-all cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

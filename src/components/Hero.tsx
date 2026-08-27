"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronDown,
  CheckCircle,
  Car,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  const [pickupCity, setPickupCity] = useState("Select your city");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("Select your time");

  const [dropoffCity, setDropoffCity] = useState("Select your city");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("Select your time");

  const cities = ["London, UK", "Manchester, UK", "Birmingham, UK", "Leeds, UK", "Liverpool, UK"];
  const times = ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "09:00 PM"];

  return (
    <section
      id="home"
      className="relative w-full h-[calc(100dvh-80px)] min-h-[580px] max-h-[820px] bg-[#3563E9] flex flex-col justify-between overflow-visible"
    >
      {/* 1. Hero Background Image (hero-image.png) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="SwiftRide Hero Background"
          fill
          priority
          className="object-cover object-right-bottom sm:object-right-top lg:object-center"
          quality={95}
        />
        {/* Left Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2452DB]/95 via-[#2452DB]/55 to-transparent w-full lg:w-[62%] z-1" />
      </div>

      {/* 2. Floating "10K+ Happy Customers" Card (High up beside Big Ben) */}
      <div className="absolute top-[18%] sm:top-[20%] lg:top-[38%] right-[3%] sm:right-[5%] lg:right-[5%] z-20 bg-white rounded-[10px] p-3 sm:p-3.5 shadow-2xl border border-white/80 pointer-events-auto transition-transform hover:scale-105 duration-200">
        <div className="space-y-0.5">
          <div className="text-xl sm:text-2xl font-black text-[#3563E9] tracking-tight leading-none">
            10K+
          </div>
          <div className="text-[11px] font-bold text-slate-700">
            Happy Customers
          </div>
        </div>

        {/* Overlapping Client Avatars */}
        <div className="flex items-center -space-x-2 pt-2">
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full ring-2 ring-white overflow-hidden relative">
            <Image
              src="/admin-dashboard/dashboard_16.webp"
              alt="Customer 1"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full ring-2 ring-white overflow-hidden relative bg-slate-200">
            <Image
              src="/admin-dashboard/dashboard_16.webp"
              alt="Customer 2"
              fill
              sizes="28px"
              className="object-cover grayscale"
            />
          </div>
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full ring-2 ring-white overflow-hidden relative bg-blue-100 flex items-center justify-center text-[10px] font-bold text-[#3563E9]">
            +4k
          </div>
        </div>
      </div>

      {/* 3. "Explore More Together" Script Tagline */}
      <div className="hidden lg:block absolute top-[18%] xl:top-[20%] left-[52%] xl:left-[53.5%] z-20 pointer-events-none">
        <div className="font-caveat text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] text-white font-bold leading-tight drop-shadow-md text-left -rotate-2">
          <div>Explore</div>
          <div className="text-white/95">More Together</div>
          <svg
            className="w-28 sm:w-32 h-3.5 text-white/90 mt-0.5"
            viewBox="0 0 120 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 9C40 2 80 2 117 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 4. Main Hero Left Content */}
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
        <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-xs">
            <CheckCircle className="w-4 h-4 text-white fill-white/20" />
            <span>100% Trusted Car rental platform in the UK</span>
          </div>

          {/* Headline */}
          <h1 className="text-white font-extrabold text-3.5xl sm:text-5xl lg:text-[48px] xl:text-[52px] tracking-tight leading-[1.12]">
            Fast and easy way<br />
            <span className="relative inline-block">
              To rent a car
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/85 font-normal text-sm sm:text-base leading-[24px] sm:leading-[26px] max-w-[480px]">
            Our Car Rental online booking system designed to meet the specific needs of car rental
            business owners. This easy-to-use car rental software will let you manage.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-6 pt-1">
            <Link
              href="#rental-details"
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-[#3563E9] font-bold text-sm sm:text-base rounded-[5px] shadow-lg hover:bg-white/95 transition-all hover:scale-105 inline-flex items-center gap-2 active:scale-95"
            >
              <span>Booking Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#rental-details"
              className="text-white font-semibold text-sm sm:text-base hover:text-white/85 transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>See all cars</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Value Pillars */}
          <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-3 max-w-[480px]">
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0">
                <Car className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">
                Wide Range <br className="hidden sm:inline" />of Vehicles
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/90">
              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">
                Safe & Secure <br className="hidden sm:inline" />Booking
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/90">
              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0">
                <Headphones className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold leading-tight">
                24/7 Customer <br className="hidden sm:inline" />Support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Original Bottom Filter/Search Bar: 50% in Hero & 50% in section below */}
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
                      value={pickupDate}
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
                      value={dropoffDate}
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

            {/* Search Button */}
            <div className="lg:col-span-2 flex justify-end">
              <Link
                href="#rental-details"
                className="w-full lg:w-[110px] h-[44px] bg-[#3563E9] hover:bg-[#254EDB] text-white font-semibold text-base rounded-[10px] shadow flex items-center justify-center transition-all cursor-pointer"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

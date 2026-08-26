"use client";

import { useState } from "react";

export default function SearchWidget() {
  const [pickupLocation, setPickupLocation] = useState("Select your city");
  const [pickupDate, setPickupDate] = useState("Select your date");
  const [pickupTime, setPickupTime] = useState("Select your time");

  const [dropoffLocation, setDropoffLocation] = useState("Select your city");
  const [dropoffDate, setDropoffDate] = useState("Select your date");
  const [dropoffTime, setDropoffTime] = useState("Select your time");

  const cities = ["London, UK", "Manchester, UK", "Birmingham, UK", "Leeds, UK", "Glasgow, UK"];
  const times = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "06:00 PM", "08:00 PM"];

  return (
    <section id="booking" className="w-full bg-[#f6f7f9] py-8 px-6 md:px-16 -mt-10 relative z-20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Pick - Up Card */}
        <div className="bg-[#f3f3f3] rounded-[10px] p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-4 h-4 bg-[#616161]/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-semibold text-base text-[#1a202c]">Pick - Up</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="block font-bold text-base text-[#1a202c]">Locations</label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-transparent text-xs text-black font-medium focus:outline-none cursor-pointer"
              >
                <option value="Select your city">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5 sm:border-l sm:border-black/15 sm:pl-4">
              <label className="block font-bold text-base text-[#1a202c]">Date</label>
              <input
                type="date"
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-transparent text-xs text-black font-medium focus:outline-none cursor-pointer"
              />
            </div>

            {/* Time */}
            <div className="space-y-1.5 sm:border-l sm:border-black/15 sm:pl-4">
              <label className="block font-bold text-base text-[#1a202c]">Time</label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full bg-transparent text-xs text-black font-medium focus:outline-none cursor-pointer"
              >
                <option value="Select your time">Select your time</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Drop - Off Card with Search Button */}
        <div className="bg-[#f3f3f3] rounded-[10px] p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col justify-between relative">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-4 h-4 bg-[#c4c4c4] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-semibold text-base text-[#1a202c]">Drop - Off</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Location */}
            <div className="sm:col-span-3 space-y-1.5">
              <label className="block font-bold text-base text-[#1a202c]">Locations</label>
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full bg-transparent text-xs text-black font-medium focus:outline-none cursor-pointer"
              >
                <option value="Select your city">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="sm:col-span-3 space-y-1.5 sm:border-l sm:border-black/15 sm:pl-4">
              <label className="block font-bold text-base text-[#1a202c]">Date</label>
              <input
                type="date"
                onChange={(e) => setDropoffDate(e.target.value)}
                className="w-full bg-transparent text-xs text-black font-medium focus:outline-none cursor-pointer"
              />
            </div>

            {/* Time */}
            <div className="sm:col-span-3 space-y-1.5 sm:border-l sm:border-black/15 sm:pl-4">
              <label className="block font-bold text-base text-[#1a202c]">Time</label>
              <select
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="w-full bg-transparent text-xs text-black font-medium focus:outline-none cursor-pointer"
              >
                <option value="Select your time">Select your time</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Action */}
            <div className="sm:col-span-3 flex sm:justify-end mt-3 sm:mt-0">
              <button
                type="button"
                className="w-full sm:w-[110px] h-11 bg-white hover:bg-black hover:text-white text-black font-semibold text-base rounded shadow flex items-center justify-center transition-all duration-200"
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

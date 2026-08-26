"use client";

import { useState } from "react";
import { Heart, Fuel, Gauge, Users } from "lucide-react";

interface CarItem {
  id: number;
  name: string;
  category: string;
  price: string;
  gas: string;
  transmission: string;
  capacity: string;
}

export default function PopularCars() {
  const [activeTab, setActiveTab] = useState("Popular");
  const [favorites, setFavorites] = useState<number[]>([1]);

  const tabs = ["Popular", "Large Car", "Small Car", "Exclusive Car"];

  const cars: CarItem[] = [
    {
      id: 1,
      name: "All New Rush",
      category: "Suv",
      price: "$72.00",
      gas: "70L",
      transmission: "Manual",
      capacity: "6 People",
    },
    {
      id: 2,
      name: "CR - V",
      category: "Suv",
      price: "$80.00",
      gas: "80L",
      transmission: "Automatic",
      capacity: "6 People",
    },
    {
      id: 3,
      name: "All New Terios",
      category: "Suv",
      price: "$74.00",
      gas: "90L",
      transmission: "Manual",
      capacity: "6 People",
    },
    {
      id: 4,
      name: "Nissan GT - R",
      category: "Sport",
      price: "$96.00",
      gas: "80L",
      transmission: "Manual",
      capacity: "2 People",
    },
    {
      id: 5,
      name: "Koenigsegg",
      category: "Sport",
      price: "$99.00",
      gas: "90L",
      transmission: "Manual",
      capacity: "2 People",
    },
    {
      id: 6,
      name: "Rolls - Royce",
      category: "Sedan",
      price: "$96.00",
      gas: "70L",
      transmission: "Manual",
      capacity: "4 People",
    },
    {
      id: 7,
      name: "MG ZX Exclusive",
      category: "Hatchback",
      price: "$76.00",
      gas: "70L",
      transmission: "Manual",
      capacity: "4 People",
    },
    {
      id: 8,
      name: "New MG ZS",
      category: "Suv",
      price: "$80.00",
      gas: "80L",
      transmission: "Manual",
      capacity: "6 People",
    },
  ];

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section id="rental-details" className="w-full bg-[#F6F7F9] py-20 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading - No uppercase */}
        <div className="text-center mb-12">
          <h2 className="text-[#0B132A] font-medium text-3xl md:text-5xl tracking-tight leading-[1.2] mb-4">
            Most popular car rental deals
          </h2>
          <p className="text-[#596780] font-normal text-base md:text-lg max-w-[530px] mx-auto leading-[27px]">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Category Tabs: Spread Full-Width across the container */}
        <div className="w-full border-b border-slate-200 mb-12">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 text-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 text-base sm:text-lg md:text-[20px] font-semibold tracking-tight transition-all cursor-pointer relative flex items-center justify-center ${
                  activeTab === tab
                    ? "text-[#3563E9] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#3563E9]"
                    : "text-[#596780] hover:text-[#0B132A]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid - 8 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => {
            const isFav = favorites.includes(car.id);
            return (
              <div
                key={car.id}
                className="bg-white rounded-[10px] p-6 flex flex-col justify-between h-[390px] border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 relative"
              >
                {/* Top: Title & Favorite Heart */}
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-[#0B132A] tracking-tight">{car.name}</h3>
                      <span className="text-xs font-medium text-[#596780]">{car.category}</span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(car.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`w-5 h-5 ${isFav ? "fill-red-500 text-red-500" : "stroke-current"}`}
                      />
                    </button>
                  </div>

                  {/* Middle: Centered Car Vector Graphic */}
                  <div className="w-full flex justify-center pt-8 pb-4">
                    <svg className="w-40 h-20 text-[#3563E9]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Group: Specs pushed right to the bottom & Price Footer */}
                <div className="space-y-4">
                  {/* Car Specs (Gas, Transmission, People) positioned at the bottom of the card */}
                  <div className="flex items-center justify-between w-full text-xs text-[#596780] font-medium px-1">
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-[#3563E9]" />
                      <span>{car.gas}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[#3563E9]" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#3563E9]" />
                      <span>{car.capacity}</span>
                    </div>
                  </div>

                  {/* Price and Rent Now Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="font-bold text-xl text-[#0B132A]">{car.price}/</span>
                      <span className="text-sm font-normal text-[#596780]">day</span>
                    </div>
                    <button className="w-[116px] h-11 bg-[#3563E9] hover:bg-[#254EDB] text-white font-semibold text-base rounded flex items-center justify-center transition-all shadow-sm cursor-pointer">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination */}
        <div className="flex items-center justify-between mt-12 pt-6">
          <div className="mx-auto flex items-center gap-6">
            <button className="w-[156px] h-11 bg-[#3563E9] hover:bg-[#254EDB] text-white font-semibold text-base rounded flex items-center justify-center transition-all shadow-sm cursor-pointer">
              Show more car
            </button>
          </div>
          <span className="text-[#0B132A] font-medium text-sm text-right">120 Car</span>
        </div>
      </div>
    </section>
  );
}

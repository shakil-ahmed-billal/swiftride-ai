"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BestSellerCar {
  id: number;
  name: string;
  price: string;
  sales: string;
  image: string;
}

const bestSellers: BestSellerCar[] = [
  {
    id: 1,
    name: "Range Rover",
    price: "$260",
    sales: "6547",
    image: "/admin-dashboard/dashboard_4.webp",
  },
  {
    id: 2,
    name: "Audi S3",
    price: "$1474",
    sales: "3474",
    image: "/admin-dashboard/dashboard_5.webp",
  },
  {
    id: 3,
    name: "Blue Nissan",
    price: "$8784",
    sales: "1478",
    image: "/admin-dashboard/dashboard_6.webp",
  },
  {
    id: 4,
    name: "Toyota Corolla",
    price: "$3240",
    sales: "987",
    image: "/admin-dashboard/dashboard_7.webp",
  },
  {
    id: 5,
    name: "Compact car",
    price: "$597",
    sales: "784",
    image: "/admin-dashboard/dashboard_12.webp",
  },
];

export default function BestSeller() {
  const [showAllModal, setShowAllModal] = useState(false);

  return (
    <div className="bg-white rounded-[8px] border border-slate-200/80 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0B132A]">Best Seller</h2>
        <button
          type="button"
          onClick={() => setShowAllModal(!showAllModal)}
          className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-[5px] text-xs font-semibold transition-colors"
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="p-3.5 flex-1 flex flex-col justify-between divide-y divide-slate-100">
        {bestSellers.map((car) => (
          <div
            key={car.id}
            className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group hover:bg-slate-50/60 px-1.5 rounded-[6px] transition-colors"
          >
            {/* Left: Thumbnail & Name & Price */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-8 rounded-[6px] bg-slate-50 border border-slate-100 flex items-center justify-center p-0.5 relative shrink-0">
                <Image
                  src={car.image}
                  alt={car.name}
                  width={34}
                  height={26}
                  className="object-contain max-h-7 w-auto group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-[#0B132A] truncate">
                  {car.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{car.price}</p>
              </div>
            </div>

            {/* Right: Sales Count */}
            <div className="text-right shrink-0">
              <span className="block text-[11px] text-slate-400 font-medium">Sales</span>
              <span className="text-xs sm:text-sm font-bold text-[#0B132A]">
                {car.sales}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

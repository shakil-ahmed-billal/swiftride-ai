"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface BestSellerCar {
  id: string;
  name: string;
  price_per_day: number;
  sales_count: number;
  image: string;
}

export default function BestSeller() {
  const [cars, setCars] = useState<BestSellerCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBestSellers() {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("id, name, price_per_day, sales_count, image")
          .order("sales_count", { ascending: false })
          .limit(5);

        if (data && !error) {
          setCars(data);
        }
      } catch (err) {
        console.error("Failed to load best sellers:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadBestSellers();
  }, []);

  return (
    <div className="bg-white rounded-[8px] border border-slate-200/80 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0B132A]">Best Seller</h2>
        <button
          type="button"
          className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-[5px] text-xs font-semibold transition-colors"
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="p-3.5 flex-1 flex flex-col justify-between divide-y divide-slate-100 min-h-[280px]">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
            Loading best sellers...
          </div>
        ) : cars.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
            No cars found
          </div>
        ) : (
          cars.map((car) => (
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
                    unoptimized={car.image.startsWith("http")}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B132A] truncate">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    ${car.price_per_day}
                  </p>
                </div>
              </div>

              {/* Right: Sales Count */}
              <div className="text-right shrink-0">
                <span className="block text-[11px] text-slate-400 font-medium">Sales</span>
                <span className="text-xs sm:text-sm font-bold text-[#0B132A]">
                  {car.sales_count.toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

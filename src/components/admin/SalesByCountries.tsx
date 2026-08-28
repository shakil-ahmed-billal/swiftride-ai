"use client";

import { supabase } from "@/lib/supabase";
import { ChevronDown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import WorldMapSvg, { CountrySalesData } from "./WorldMapSvg";

const defaultCountrySales: Record<string, CountrySalesData> = {
  usa: {
    id: "usa",
    name: "United States",
    sales: 0,
    salesFormatted: "0 Bookings",
    color: "#092C4C",
  },
  brazil: {
    id: "brazil",
    name: "Brazil",
    sales: 0,
    salesFormatted: "0 Bookings",
    color: "#FF9F43",
  },
  africa: {
    id: "africa",
    name: "Africa",
    sales: 0,
    salesFormatted: "0 Bookings",
    color: "#FF9F43",
  },
  china: {
    id: "china",
    name: "China",
    sales: 0,
    salesFormatted: "0 Bookings",
    color: "#092C4C",
  },
};

export default function SalesByCountries() {
  const [salesMap, setSalesMap] =
    useState<Record<string, CountrySalesData>>(defaultCountrySales);
  const [activeData, setActiveData] = useState<CountrySalesData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [period, setPeriod] = useState("This Week");

  useEffect(() => {
    async function loadCountrySales() {
      try {
        const { data: bookings, error } = await supabase
          .from("bookings")
          .select("country, total_amount, status");

        if (bookings && !error) {
          const counts: Record<string, number> = {
            usa: 0,
            brazil: 0,
            africa: 0,
            china: 0,
          };

          bookings.forEach((b) => {
            const c = (b.country || "").toLowerCase();
            if (
              c.includes("united states") ||
              c.includes("usa") ||
              c.includes("us") ||
              c.includes("america") ||
              c.includes("kingdom") ||
              c.includes("uk")
            ) {
              counts.usa += 1;
            } else if (c.includes("brazil")) {
              counts.brazil += 1;
            } else if (c.includes("china")) {
              counts.china += 1;
            } else if (c.includes("africa")) {
              counts.africa += 1;
            } else {
              counts.usa += 1;
            }
          });

          const updated: Record<string, CountrySalesData> = {
            usa: {
              id: "usa",
              name: "United States",
              sales: counts.usa,
              salesFormatted: `${counts.usa} Bookings`,
              color: "#092C4C",
            },
            brazil: {
              id: "brazil",
              name: "Brazil",
              sales: counts.brazil,
              salesFormatted: `${counts.brazil} Bookings`,
              color: "#FF9F43",
            },
            africa: {
              id: "africa",
              name: "Africa",
              sales: counts.africa,
              salesFormatted: `${counts.africa} Bookings`,
              color: "#FF9F43",
            },
            china: {
              id: "china",
              name: "China",
              sales: counts.china,
              salesFormatted: `${counts.china} Bookings`,
              color: "#092C4C",
            },
          };

          setSalesMap(updated);
        }
      } catch (err) {
        console.error("Failed to load country sales from Supabase:", err);
      }
    }

    loadCountrySales();

    const channel = supabase
      .channel("realtime-country-sales")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          loadCountrySales();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleHover = (e: React.MouseEvent<SVGPathElement>, key: string) => {
    const data = salesMap[key];
    if (data) {
      const svg = e.currentTarget.closest("svg");
      if (svg) {
        const svgRect = svg.getBoundingClientRect();
        const pathRect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({
          x: pathRect.left - svgRect.left + pathRect.width / 2,
          y: pathRect.top - svgRect.top,
        });
      }
      setActiveData(data);
    }
  };

  const handleLeave = () => {
    setActiveData(null);
  };

  const handleClick = (key: string) => {
    const data = salesMap[key];
    if (data) {
      setActiveData(data);
    }
  };

  return (
    <div className="bg-white rounded-[8px] border border-slate-200/80 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.02)] p-4 sm:p-5 flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2">
        <h2 className="text-base font-bold text-[#0B132A]">
          Sales by Countries
        </h2>
        <div className="relative">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[5px] text-xs font-medium text-slate-700 shadow-2xs">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer pr-1 text-xs"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Interactive SVG World Map */}
      <div className="relative w-full aspect-[326/197] my-2 flex items-center justify-center overflow-visible">
        {/* Floating Tooltip On Hover / Click */}
        {activeData && tooltipPos && (
          <div
            className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 w-36 rounded-[6px] overflow-hidden shadow-xl border border-slate-200/90 transition-all duration-150 animate-in fade-in zoom-in-95"
            style={{
              left: tooltipPos.x + "px",
              top: tooltipPos.y + "px",
            }}
          >
            <div className="bg-[#FF9F43] text-white px-2.5 py-1.5 text-center text-xs font-bold tracking-wide">
              {activeData.name}
            </div>
            <div className="bg-white px-2.5 py-2 text-center text-sm font-extrabold text-[#0B132A]">
              {activeData.salesFormatted}
            </div>
          </div>
        )}

        <WorldMapSvg
          salesMap={salesMap}
          onHover={handleHover}
          onLeave={handleLeave}
          onClick={handleClick}
        />
      </div>

      {/* Bottom Trend */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
        <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600">
          <TrendingUp className="w-3.5 h-3.5" />
          48%
        </span>
        <span>increase compare to last week</span>
      </div>
    </div>
  );
}

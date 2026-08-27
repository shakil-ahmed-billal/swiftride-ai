"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
  ShoppingBag,
  PackageCheck,
  SlidersHorizontal,
} from "lucide-react";

export default function StatCards() {
  const [dateRange] = useState("01 Jan 2024 - 07 Jan 2024");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-4">
      {/* Top Greeting & Date Filter Bar */}
      <div className="bg-white rounded-[8px] p-3.5 sm:p-4 border border-slate-200/80 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Greeting with Waving Hand */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
            <Image
              src="/admin-dashboard/dashboard_2.webp"
              alt="Waving Hand"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[#0B132A] leading-tight">
              Hi Mike Witzel,{" "}
              <span className="font-normal text-slate-500 text-xs sm:text-sm">
                here&apos;s what&apos;s happening with your store today.
              </span>
            </h1>
          </div>
        </div>

        {/* Date Selector & Action Tools */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[6px] text-xs font-medium text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#0B132A]" />
            <span>{dateRange}</span>
          </div>

          <button
            type="button"
            className="p-1.5 bg-white border border-slate-200 rounded-[6px] text-slate-600 hover:text-[#3563E9] transition-colors shadow-2xs"
            title="Filter Analytics"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            className={`p-1.5 bg-white border border-slate-200 rounded-[6px] text-slate-600 hover:text-[#3563E9] transition-colors shadow-2xs ${
              isRefreshing ? "animate-spin text-[#3563E9]" : ""
            }`}
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Highlight Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Weekly Earning */}
        <div className="bg-white rounded-[8px] p-4 border border-slate-200/80 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3">
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold text-[#FA8231]">
              Weekly Earning
            </span>
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-extrabold text-[#0B132A] tracking-tight">
                $95,000.45
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  48%
                </span>
                <span>increase compare to last week</span>
              </div>
            </div>
          </div>

          <div className="relative w-16 h-16 shrink-0">
            <Image
              src="/admin-dashboard/dashboard_3.webp"
              alt="Weekly Earning"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>

        {/* Card 2: No of Total Sales */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-[8px] p-4 text-white shadow-xs flex flex-col justify-between min-h-[120px] group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </div>

          <div className="space-y-0.5 mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              10,000+
            </div>
            <div className="text-xs font-medium text-amber-100">
              No of Total Sales
            </div>
          </div>
        </div>

        {/* Card 3: No of Purchased Goods */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0B132A] to-[#1E293B] rounded-[8px] p-4 text-white shadow-xs flex flex-col justify-between min-h-[120px] group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-white/10 backdrop-blur-xs flex items-center justify-center">
              <PackageCheck className="w-4 h-4 text-[#FA8231]" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </div>

          <div className="space-y-0.5 mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              800+
            </div>
            <div className="text-xs font-medium text-slate-300">
              No of Purchased Goods
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

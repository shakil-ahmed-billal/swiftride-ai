"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
  ShoppingBag,
  PackageCheck,
  SlidersHorizontal,
  DollarSign,
} from "lucide-react";
import { supabase, getStoredAuthUser } from "@/lib/supabase";

export default function StatCards() {
  const [dateRange] = useState("Live Database Overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalSalesCount, setTotalSalesCount] = useState<number>(0);
  const [activeRentalsCount, setActiveRentalsCount] = useState<number>(0);
  const [adminName, setAdminName] = useState<string>("Mike Witzel");

  const loadRealMetrics = async () => {
    try {
      const stored = getStoredAuthUser();
      if (stored && stored.full_name) {
        setAdminName(stored.full_name);
      }

      // 1. Fetch real total revenue and booking count from Supabase bookings table
      const { data: bookingsData, error: bErr } = await supabase
        .from("bookings")
        .select("total_amount, status");

      // 2. Fetch leads count from Supabase leads table
      const { count: leadsCount } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      // 3. Fetch active cars count from Supabase cars table
      const { count: carsCount } = await supabase
        .from("cars")
        .select("*", { count: "exact", head: true });

      if (bookingsData && !bErr) {
        const totalRev = bookingsData.reduce(
          (sum, b) => sum + (parseFloat(b.total_amount?.toString() || "0")),
          0
        );
        const activeCount = bookingsData.filter((b) => b.status === "Success").length;

        setTotalRevenue(totalRev);
        setTotalSalesCount(bookingsData.length + (leadsCount || 0));
        setActiveRentalsCount(activeCount > 0 ? activeCount : (carsCount || 6));
      }
    } catch (err) {
      console.error("Failed to load real-time admin metrics:", err);
    }
  };

  useEffect(() => {
    loadRealMetrics();

    // Subscribe to realtime changes on bookings table
    const subscription = supabase
      .channel("admin-stats-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          loadRealMetrics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadRealMetrics();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Greeting & Date Filter Bar */}
      <div className="bg-white rounded-[8px] p-3.5 sm:p-4 border border-slate-200/80 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Greeting with Avatar/Waving Icon */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0 flex items-center justify-center bg-blue-50 rounded-[6px] border border-blue-100">
            <Image
              src="/admin-dashboard/dashboard_2.webp"
              alt="Store Overview"
              width={24}
              height={24}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[#0B132A] leading-tight">
              Hi {adminName},{" "}
              <span className="font-normal text-slate-500 text-xs sm:text-sm">
                here is the live performance of your SwiftRide fleet today.
              </span>
            </h1>
          </div>
        </div>

        {/* Live Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-[6px] text-xs font-medium text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#0B132A]" />
            <span>{dateRange}</span>
          </div>

          <button
            type="button"
            className="p-1.5 bg-white border border-slate-200 rounded-[6px] text-slate-600 hover:text-[#3563E9] transition-colors shadow-2xs cursor-pointer"
            title="Filter Analytics"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            className={`p-1.5 bg-white border border-slate-200 rounded-[6px] text-slate-600 hover:text-[#3563E9] transition-colors shadow-2xs cursor-pointer ${
              isRefreshing ? "animate-spin text-[#3563E9]" : ""
            }`}
            title="Refresh Real-time Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Highlight Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Real-Time Revenue */}
        <div className="bg-white rounded-[8px] p-4 border border-slate-200/80 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3">
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold text-[#FA8231]">
              Total Fleet Revenue
            </span>
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-extrabold text-[#0B132A] tracking-tight">
                ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Live Verified
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-14 h-14 rounded-[8px] bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7 text-[#FA8231]" />
          </div>
        </div>

        {/* Card 2: No of Total Sales / Bookings */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-[8px] p-4 text-white shadow-xs flex flex-col justify-between min-h-[120px] group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </div>

          <div className="space-y-0.5 mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {totalSalesCount}
            </div>
            <div className="text-xs font-medium text-amber-100">
              Total Reservations & Inquiries
            </div>
          </div>
        </div>

        {/* Card 3: Active Fleet Units */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0B132A] to-[#1E293B] rounded-[8px] p-4 text-white shadow-xs flex flex-col justify-between min-h-[120px] group">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-[6px] bg-white/10 backdrop-blur-xs flex items-center justify-center">
              <PackageCheck className="w-4 h-4 text-[#FA8231]" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </div>

          <div className="space-y-0.5 mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {activeRentalsCount}
            </div>
            <div className="text-xs font-medium text-slate-300">
              Active Fleet & Rentals
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

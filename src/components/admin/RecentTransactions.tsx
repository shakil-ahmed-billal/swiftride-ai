"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { supabase, Booking } from "@/lib/supabase";

export default function RecentTransactions() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (data && !error) {
          setBookings(data as Booking[]);
        }
      } catch (err) {
        console.error("Failed to load bookings:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadBookings();

    // Real-time subscription to bookings table
    const channel = supabase
      .channel("realtime-bookings")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          setBookings((prev) => [payload.new as Booking, ...prev.slice(0, 4)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white rounded-[8px] border border-slate-200/80 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden">
      {/* Header with View All */}
      <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#0B132A]">Recent Transactions</h2>
        <button
          type="button"
          className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-[5px] text-xs font-semibold transition-colors"
        >
          View All
        </button>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto min-h-[280px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400 py-12">
            Loading transactions...
          </div>
        ) : bookings.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400 py-12">
            No transactions found
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100 text-slate-600 font-semibold">
                <th className="py-2.5 px-3.5 w-10">#</th>
                <th className="py-2.5 px-3.5 min-w-[170px]">Order Details</th>
                <th className="py-2.5 px-3.5 min-w-[130px]">Payment</th>
                <th className="py-2.5 px-3.5 min-w-[100px]">Status</th>
                <th className="py-2.5 px-3.5 text-right min-w-[90px]">Amount</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {bookings.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Number */}
                  <td className="py-2 px-3.5 font-semibold text-slate-400">
                    {idx + 1}
                  </td>

                  {/* Order Details */}
                  <td className="py-2 px-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-7 rounded-[5px] bg-slate-50 border border-slate-100 p-0.5 flex items-center justify-center shrink-0">
                        <Image
                          src={tx.car_image || "/admin-dashboard/dashboard_4.webp"}
                          alt={tx.car_name}
                          width={32}
                          height={24}
                          className="object-contain max-h-6 w-auto group-hover:scale-105 transition-transform"
                          unoptimized={tx.car_image?.startsWith("http")}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#0B132A] leading-tight">
                          {tx.car_name}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{tx.duration || "15 Mins"}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="py-2 px-3.5">
                    <div className="font-medium text-slate-800">
                      {tx.payment_method}
                    </div>
                    <div className="text-[11px] font-mono text-sky-600">
                      {tx.transaction_id}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-2 px-3.5">
                    {tx.status === "Success" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Success
                      </span>
                    )}
                    {tx.status === "Cancelled" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Cancelled
                      </span>
                    )}
                    {tx.status === "Pending" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="py-2 px-3.5 text-right font-extrabold text-[#0B132A] text-sm">
                    ${parseFloat(tx.total_amount?.toString() || "0").toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

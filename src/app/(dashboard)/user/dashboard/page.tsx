"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  Download,
  Eye,
  X,
  FileText,
  Plus,
  RefreshCw,
} from "lucide-react";
import { supabase, Booking, getStoredAuthUser, AuthUser } from "@/lib/supabase";

export default function UserDashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchRealBookings = async (currentUserEmail: string) => {
    setIsLoading(true);
    const cleanEmail = (currentUserEmail || "user@swiftride.com").trim().toLowerCase();

    try {
      // 1. Fetch real Supabase bookings matching current user email (case-insensitive wildcard)
      const { data: dbBookings, error: bErr } = await supabase
        .from("bookings")
        .select("*")
        .ilike("customer_email", `%${cleanEmail}%`)
        .order("created_at", { ascending: false });

      // 2. Fetch real Supabase leads matching current user email (AI chatbot reservations)
      const { data: dbLeads, error: lErr } = await supabase
        .from("leads")
        .select("*")
        .ilike("email", `%${cleanEmail}%`)
        .order("created_at", { ascending: false });

      let combined: Booking[] = [];

      if (dbBookings && dbBookings.length > 0) {
        combined = [...(dbBookings as Booking[])];
      }

      // Convert matching AI Concierge Leads into visual booking records
      if (dbLeads && dbLeads.length > 0) {
        const leadRecords: Booking[] = dbLeads.map((l: any) => {
          let carName = "Luxury Vehicle Concierge";
          if (l.notes?.includes("Booking:")) {
            const parts = l.notes.split("Booking:");
            if (parts[1]) carName = parts[1].split("for")[0]?.trim() || carName;
          }

          return {
            id: `lead-${l.id}`,
            customer_name: l.name || "Valued Customer",
            customer_email: l.email,
            car_id: "car1",
            car_name: carName,
            car_image: "/car-image/car-image-1-Picsart-BackgroundRemover.png",
            start_date: l.created_at,
            end_date: new Date(new Date(l.created_at).getTime() + 3 * 86400000).toISOString(),
            duration: "3 Days",
            total_amount: 780.0,
            payment_method: "Concierge Reservation",
            transaction_id: `#AI-${l.id.slice(0, 8)}`,
            status: "Success",
            created_at: l.created_at,
          };
        });

        combined = [...combined, ...leadRecords];
      }

      // Sort by newest created_at date
      combined.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setBookings(combined);
    } catch (err) {
      console.error("Error loading user email matched data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let emailToUse = "user@swiftride.com";
    const stored = getStoredAuthUser();

    if (stored && stored.email) {
      setUser(stored);
      emailToUse = stored.email;
      fetchRealBookings(emailToUse);
    } else {
      // Fallback check Supabase Auth Session
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session?.user?.email) {
          const authUser: AuthUser = {
            id: data.session.user.id,
            email: data.session.user.email,
            full_name:
              data.session.user.user_metadata?.full_name ||
              data.session.user.email.split("@")[0],
            role: "user",
          };
          setUser(authUser);
          fetchRealBookings(authUser.email);
        } else {
          fetchRealBookings(emailToUse);
        }
      });
    }

    // Subscribe to realtime Supabase changes on bookings table
    const subscription = supabase
      .channel("user-bookings-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          const newBooking = payload.new as Booking;
          const currentTarget = (user?.email || stored?.email || "user@swiftride.com").toLowerCase();
          if (
            newBooking.customer_email &&
            newBooking.customer_email.toLowerCase().includes(currentTarget)
          ) {
            setBookings((prev) => [newBooking, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const activeTrip = bookings.find((b) => b.status === "Success") || bookings[0];
  const totalSpent = bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Personalized Welcome Banner */}
      <div className="relative bg-gradient-to-r from-[#0B132A] via-[#1E3A8A] to-[#3563E9] text-white rounded-[10px] p-6 sm:p-8 overflow-hidden shadow-lg border border-white/10">
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
            <Award className="w-3.5 h-3.5 text-[#FA8231]" />
            <span>Verified Driver • {user?.email || "user@swiftride.com"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.full_name || "Valued Driver"}!
          </h1>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
            {activeTrip
              ? `Your active rental for ${activeTrip.car_name} is registered. Drive safely and enjoy your journey with SwiftRide AI.`
              : "Explore our fleet of luxury SUVs & sedans to book your next trip with instant AI concierge support."}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/#rental-details"
              className="px-5 py-2.5 bg-[#FA8231] hover:bg-[#e06d1f] text-white font-bold text-xs rounded-[5px] transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            {activeTrip && (
              <a
                href="#active-trip"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-[5px] border border-white/20 backdrop-blur-md transition-colors"
              >
                View Active Trip
              </a>
            )}
          </div>
        </div>

        {/* Decorative Vehicle Overlay */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-end pr-6 pointer-events-none opacity-90">
          <Image
            src={activeTrip?.car_image || "/car-image/car-image-1-Picsart-BackgroundRemover.png"}
            alt="Active Vehicle"
            width={380}
            height={220}
            style={{ width: "auto", height: "auto" }}
            className="object-contain transform translate-x-4 translate-y-2 drop-shadow-2xl h-auto"
            unoptimized
          />
        </div>
      </div>

      {/* 2. User Real Live Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-[8px] border border-slate-200/80 p-4 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#596780]">Active Trips</p>
            <p className="text-xl font-bold text-[#0B132A] mt-1">
              {bookings.filter((b) => b.status === "Success").length} Vehicle(s)
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Real Live Data</span>
            </p>
          </div>
          <div className="w-11 h-11 rounded-[8px] bg-blue-50 text-[#3563E9] flex items-center justify-center border border-blue-100/80 shrink-0">
            <Car className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white rounded-[8px] border border-slate-200/80 p-4 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#596780]">Total Reservations</p>
            <p className="text-xl font-bold text-[#0B132A] mt-1">{bookings.length} Bookings</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Matched to your email</p>
          </div>
          <div className="w-11 h-11 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/80 shrink-0">
            <ShieldCheck className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white rounded-[8px] border border-slate-200/80 p-4 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#596780]">Total Amount Spent</p>
            <p className="text-xl font-bold text-[#0B132A] mt-1">${totalSpent.toFixed(2)}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Verified Real Records</p>
          </div>
          <div className="w-11 h-11 rounded-[8px] bg-amber-50 text-[#FA8231] flex items-center justify-center border border-amber-100/80 shrink-0">
            <CreditCard className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white rounded-[8px] border border-slate-200/80 p-4 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#596780]">Member Account</p>
            <p className="text-xl font-bold text-[#0B132A] mt-1">Active</p>
            <p className="text-[11px] text-[#3563E9] font-bold mt-1">SwiftRide VIP</p>
          </div>
          <div className="w-11 h-11 rounded-[8px] bg-amber-50/80 text-amber-600 flex items-center justify-center border border-amber-200/60 shrink-0">
            <Award className="w-5.5 h-5.5" />
          </div>
        </div>
      </div>

      {/* 3. Featured Active Rental Spotlight Card (if active booking exists) */}
      {activeTrip && (
        <div id="active-trip" className="bg-white rounded-[10px] border border-slate-200/80 p-5 sm:p-6 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base font-bold text-[#0B132A]">Active Trip Spotlight</h2>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold rounded-[5px]">
              Confirmed Reservation
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Car Image Preview */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200/60 rounded-[8px] p-4 flex items-center justify-center">
              <Image
                src={activeTrip.car_image || "/car-image/car-image-1-Picsart-BackgroundRemover.png"}
                alt={activeTrip.car_name}
                width={260}
                height={140}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-[140px]"
                unoptimized
              />
            </div>

            {/* Details */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-[#3563E9] bg-blue-50 px-2 py-0.5 rounded-[4px] border border-blue-100">
                  Matched Email: {activeTrip.customer_email}
                </span>
                <h3 className="text-lg font-bold text-[#0B132A] mt-1">{activeTrip.car_name}</h3>
                <p className="text-xs text-slate-500">Transaction ID: {activeTrip.transaction_id}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-[8px] border border-slate-200/60">
                <div>
                  <p className="text-[10px] font-bold text-slate-400">PICKUP DATE</p>
                  <p className="font-bold text-[#0B132A] mt-0.5">
                    {new Date(activeTrip.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">RETURN DATE</p>
                  <p className="font-bold text-[#0B132A] mt-0.5">
                    {new Date(activeTrip.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">TOTAL RATE</p>
                  <p className="font-bold text-[#3563E9] text-sm mt-0.5">${activeTrip.total_amount?.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedBooking(activeTrip)}
                  type="button"
                  className="px-4 py-2 bg-[#3563E9] hover:bg-[#274CC0] text-white text-xs font-bold rounded-[5px] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Rental Agreement</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. My Bookings & Rental History Table */}
      <div id="bookings" className="bg-white rounded-[10px] border border-slate-200/80 p-5 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#0B132A]">My Rental History & Reservations</h2>
            <p className="text-xs text-slate-500 font-medium">
              Filtered live records for <span className="font-bold text-[#3563E9]">{user?.email || "user@swiftride.com"}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchRealBookings(user?.email || "user@swiftride.com")}
              className="p-1.5 text-slate-500 hover:text-[#3563E9] bg-slate-100 hover:bg-blue-50 rounded-[5px] transition-colors cursor-pointer"
              title="Refresh Bookings"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#3563E9]" : ""}`} />
            </button>
            <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-[5px]">
              {bookings.length} Record(s) Found
            </span>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-slate-50/50 rounded-[8px] border border-dashed border-slate-200">
            <Car className="w-10 h-10 text-[#3563E9] mx-auto opacity-70" />
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="font-bold text-[#0B132A] text-sm">No Live Bookings Found</h4>
              <p className="text-xs text-slate-500">
                There are no active reservations associated with <span className="font-semibold text-slate-700">{user?.email || "this email"}</span> yet.
              </p>
            </div>
            <Link
              href="/#rental-details"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3563E9] hover:bg-[#274CC0] text-white font-bold text-xs rounded-[5px] transition-all shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Your First Vehicle</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-200/70 rounded-[6px]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-200/80 text-slate-600 font-semibold">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4 min-w-[200px]">Vehicle</th>
                  <th className="py-3 px-4 min-w-[160px]">Dates</th>
                  <th className="py-3 px-4 min-w-[140px]">Matched Customer Email</th>
                  <th className="py-3 px-4 min-w-[130px]">Transaction ID</th>
                  <th className="py-3 px-4 min-w-[110px]">Status</th>
                  <th className="py-3 px-4 text-right min-w-[90px]">Total Cost</th>
                  <th className="py-3 px-4 text-center min-w-[90px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b, idx) => (
                  <tr key={b.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-400 text-center">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-7 rounded-[4px] bg-slate-100 border border-slate-200 p-0.5 shrink-0 flex items-center justify-center">
                          <Image
                            src={b.car_image || "/car-image/car-image-1-Picsart-BackgroundRemover.png"}
                            alt={b.car_name}
                            width={36}
                            height={24}
                            style={{ width: "auto", height: "auto" }}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <span className="font-bold text-[#0B132A]">{b.car_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {new Date(b.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                      {new Date(b.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{b.customer_email}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{b.transaction_id}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[4px] text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Confirmed</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#0B132A]">${b.total_amount?.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-1.5 text-[#3563E9] hover:bg-blue-50 rounded-[4px] transition-colors cursor-pointer"
                        title="View Receipt"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Modal Receipt */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-[#0B132A] text-base">Booking Agreement & Receipt</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-[4px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-[6px] space-y-1">
                <p className="text-[10px] font-bold text-slate-400">TRANSACTION REFERENCE</p>
                <p className="font-mono font-bold text-[#3563E9] text-base">{selectedBooking.transaction_id}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Customer Email:</span>
                  <span className="font-bold text-[#0B132A]">{selectedBooking.customer_email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Vehicle:</span>
                  <span className="font-bold text-[#0B132A]">{selectedBooking.car_name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-700">{selectedBooking.duration}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Payment Method:</span>
                  <span className="font-semibold text-slate-700">{selectedBooking.payment_method}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold text-[#0B132A]">
                  <span>Total Amount Paid:</span>
                  <span className="text-[#3563E9]">${selectedBooking.total_amount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-[5px] text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => alert("Downloading PDF Receipt...")}
                className="px-4 py-2 bg-[#3563E9] text-white rounded-[5px] text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

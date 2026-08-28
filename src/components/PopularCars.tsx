"use client";

import { Car, getStoredAuthUser, supabase } from "@/lib/supabase";
import { useCarStore } from "@/store/useCarStore";
import {
  ArrowRight,
  Calendar,
  CarIcon,
  Check,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PopularCars() {
  const { searchFilter, clearSearchFilter } = useCarStore();

  const [activeTab, setActiveTab] = useState("Popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Modal State
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const [rentalDays, setRentalDays] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const tabs = ["Popular", "Large Car", "Small Car", "Exclusive Car"];
  const availableCountries = [
    "United States",
    "Brazil",
    "China",
    "Africa",
    "Southeast Asia",
    "United Kingdom",
    "Germany",
    "France",
    "Canada",
    "Australia",
  ];

  useEffect(() => {
    if (selectedCar) {
      if (searchFilter.isFilterActive && searchFilter.rentalDays) {
        setRentalDays(searchFilter.rentalDays);
      }
      const storedUser = getStoredAuthUser();
      if (storedUser && storedUser.email) {
        setIsUserLoggedIn(true);
        if (storedUser.full_name) setCustomerName(storedUser.full_name);
        setCustomerEmail(storedUser.email);
      } else {
        setIsUserLoggedIn(false);
      }
    }
  }, [selectedCar, searchFilter]);

  useEffect(() => {
    async function fetchCars() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .order("sales_count", { ascending: false });

        if (data && !error) {
          setCars(data as Car[]);
        }
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar || !customerName || !customerEmail) return;

    setIsSubmitting(true);
    try {
      const totalAmount = selectedCar.price_per_day * rentalDays;
      const txId = `#SR-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const cleanEmail = customerEmail.trim().toLowerCase();
      const cleanName = customerName.trim();

      const { error } = await supabase.from("bookings").insert([
        {
          customer_name: cleanName,
          customer_email: cleanEmail,
          country: country || "United States",
          car_id: selectedCar.id,
          car_name: selectedCar.name,
          car_image: selectedCar.image,
          duration: `${rentalDays} Days`,
          total_amount: totalAmount,
          payment_method: "Credit Card",
          transaction_id: txId,
          status: "Success",
        },
      ]);

      if (error) {
        console.error("Error booking:", error);
      } else {
        // Increment sales_count in live Supabase cars table
        const { data: carData } = await supabase
          .from("cars")
          .select("sales_count")
          .eq("id", selectedCar.id)
          .single();

        if (carData) {
          await supabase
            .from("cars")
            .update({ sales_count: (carData.sales_count || 0) + 1 })
            .eq("id", selectedCar.id);
        }

        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
          setSelectedCar(null);
        }, 2200);
      }
    } catch (err) {
      console.error("Failed to book car:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter cars based on active tab
  const filteredCars = cars.filter((car) => {
    if (activeTab === "Popular") return true;
    if (activeTab === "Large Car") return car.type === "SUV" || car.seats >= 7;
    if (activeTab === "Small Car")
      return car.type === "Sedan" || car.type === "Hatchback";
    if (activeTab === "Exclusive Car")
      return (
        car.price_per_day >= 150 ||
        car.type === "Sports" ||
        car.type === "Electric"
      );
    return true;
  });

  return (
    <section
      id="rental-details"
      className="w-full bg-[#F6F7F9] py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Consistent Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-2 sm:mb-3">
            Most popular car rental deals
          </h2>
          <p className="text-[#596780] font-normal text-xs sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            Find the right car for your next trip
          </p>
        </div>

        {/* Active Search Filter Banner */}
        {searchFilter.isFilterActive && (
          <div className="mb-8 p-4 bg-white border border-blue-200/90 rounded-[10px] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#3563E9] shrink-0 shadow-2xs">
                <CarIcon className="w-4.5 h-4.5 text-[#3563E9]" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-[#0B132A]">
                  Active Rental Query:{" "}
                  <span className="text-[#3563E9]">
                    {searchFilter.pickupCity}
                  </span>
                  {searchFilter.dropoffCity !== searchFilter.pickupCity && (
                    <span className="text-slate-500 font-normal">
                      {" "}
                      → {searchFilter.dropoffCity}
                    </span>
                  )}
                </p>
                <p className="text-[11px] sm:text-xs text-[#596780] flex items-center gap-1.5 flex-wrap mt-0.5">
                  <Calendar className="w-3 h-3 text-[#3563E9]" />
                  <span>
                    {searchFilter.pickupDate || "Today"} (
                    {searchFilter.pickupTime}) to{" "}
                    {searchFilter.dropoffDate || "3 Days"} (
                    {searchFilter.dropoffTime})
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-[4px] border border-emerald-200/60">
                    {searchFilter.rentalDays} Days Duration Applied
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={clearSearchFilter}
              type="button"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[6px] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="w-full border-b border-slate-200 mb-8 sm:mb-12">
          <div className="w-full grid grid-cols-4 text-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 sm:py-3.5 text-xs sm:text-base md:text-[20px] font-semibold tracking-tight transition-all cursor-pointer relative flex items-center justify-center ${
                  activeTab === tab
                    ? "text-[#3563E9] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#3563E9]"
                    : "text-[#596780] hover:text-[#0B132A]"
                }`}
              >
                {tab === "Exclusive Car" ? (
                  <>
                    <span className="hidden sm:inline">Exclusive Car</span>
                    <span className="sm:hidden">Exclusive</span>
                  </>
                ) : (
                  tab
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid - 2 columns on mobile with large prominent vehicle visuals, 3 on desktop */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 font-medium">
            Loading live fleet data from Supabase...
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredCars.map((car) => {
              const isFav = favorites.includes(car.id);
              return (
                <div
                  key={car.id}
                  onClick={() => setSelectedCar(car)}
                  className="bg-white rounded-[10px] p-3 sm:p-6 lg:p-7 flex flex-col justify-between h-auto sm:min-h-[440px] lg:min-h-[480px] border border-slate-200/80 shadow-[0px_3px_14px_0px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 relative group cursor-pointer"
                >
                  {/* Top: Title & Favorite Heart */}
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-xs sm:text-xl lg:text-2xl text-[#0B132A] tracking-tight truncate leading-tight">
                          {car.name}
                        </h3>
                        <span className="text-[10px] sm:text-sm font-semibold text-[#596780] truncate block mt-0.5">
                          {car.brand} • {car.type}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(car.id);
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer shrink-0 rounded-[5px]"
                        aria-label="Add to favorites"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${isFav ? "fill-red-500 text-red-500" : "stroke-current"}`}
                        />
                      </button>
                    </div>

                    {/* Middle: Large Prominent Car Image filling card width */}
                    <div className="w-full h-22 sm:h-48 lg:h-56 my-1 sm:my-3 flex items-center justify-center relative">
                      <Image
                        src={car.image}
                        alt={car.name}
                        width={460}
                        height={260}
                        className="object-contain w-full h-full max-h-20 sm:max-h-44 lg:max-h-52 drop-shadow-xs group-hover:scale-105 transition-transform duration-300 scale-105"
                        unoptimized={car.image.startsWith("http")}
                      />
                    </div>
                  </div>

                  {/* Bottom Group: Specs & Price Footer */}
                  <div className="space-y-1.5 sm:space-y-4 pt-1 sm:pt-2">
                    {/* Desktop Specs (Fuel, Transmission, Seats) */}
                    <div className="hidden sm:flex items-center justify-between w-full text-xs sm:text-sm text-[#596780] font-medium px-1">
                      <div className="flex items-center gap-1.5">
                        <Fuel className="w-4 h-4 text-[#3563E9]" />
                        <span>{car.fuel_type || "Octane"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-4 h-4 text-[#3563E9]" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#3563E9]" />
                        <span>{car.seats} Seats</span>
                      </div>
                    </div>

                    {/* Price and Rent Now Action */}
                    <div className="flex items-center justify-between pt-1.5 sm:pt-4 border-t border-slate-100">
                      <div>
                        <span className="font-extrabold text-sm sm:text-2xl lg:text-3xl text-[#0B132A]">
                          ${car.price_per_day}
                        </span>
                        <span className="text-[10px] sm:text-sm font-normal text-[#596780]">
                          /day
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCar(car);
                        }}
                        className="hidden sm:flex w-[120px] sm:w-[130px] h-10 sm:h-11 bg-[#3563E9] hover:bg-[#254EDB] text-white font-semibold text-sm rounded-[5px] items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        Rent Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="flex items-center justify-center mt-8 sm:mt-12 pt-2">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 bg-[#3563E9] text-white font-bold text-xs sm:text-sm rounded-[5px] shadow-sm hover:bg-[#254EDB] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Show More Cars</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Side Slide-Over Drawer */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedCar(null)}
            className="fixed inset-0 bg-[#0B132A]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Right Drawer Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300 ease-in-out">
            {/* Drawer Header */}
            <div className="px-6 py-5 bg-[#0B132A] text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[6px] bg-[#3563E9] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <CarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    Vehicle Reservation
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Fast & Secure Live Booking
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCar(null)}
                type="button"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {bookingSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-md animate-in zoom-in-95">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-[#0B132A]">
                      Reservation Confirmed!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Your booking for{" "}
                      <span className="font-bold text-[#3563E9]">
                        {selectedCar.name}
                      </span>{" "}
                      has been registered successfully in our Supabase system.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-[8px] text-xs text-left space-y-1.5 mt-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vehicle:</span>
                      <span className="font-bold text-[#0B132A]">
                        {selectedCar.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <span className="font-semibold text-slate-700">
                        {rentalDays} Days
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-sm">
                      <span className="text-[#0B132A]">Total Amount:</span>
                      <span className="text-[#3563E9]">
                        ${(selectedCar.price_per_day * rentalDays).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-2">
                    <Link
                      href="/user/dashboard"
                      onClick={() => setSelectedCar(null)}
                      className="w-full py-2.5 bg-[#3563E9] hover:bg-[#274CC0] text-white text-xs font-bold rounded-[5px] text-center shadow-md transition-colors"
                    >
                      View in User Dashboard
                    </Link>
                    <button
                      onClick={() => setSelectedCar(null)}
                      type="button"
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] transition-colors"
                    >
                      Close & Continue Browsing
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  id="drawer-booking-form"
                  onSubmit={handleBookingSubmit}
                  className="space-y-5"
                >
                  {/* Vehicle Spotlight Card */}
                  <div className="bg-[#F6F7F9] border border-slate-200 rounded-[10px] p-4 text-center relative overflow-hidden">
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#3563E9] text-white text-[10px] font-bold rounded-[4px]">
                      ${selectedCar.price_per_day}/day
                    </span>

                    <div className="w-full h-36 flex items-center justify-center my-2">
                      <Image
                        src={selectedCar.image}
                        alt={selectedCar.name}
                        width={280}
                        height={150}
                        style={{ width: "auto", height: "auto" }}
                        className="object-contain max-h-32 drop-shadow-md"
                        unoptimized={selectedCar.image.startsWith("http")}
                      />
                    </div>

                    <h4 className="text-base font-bold text-[#0B132A]">
                      {selectedCar.name}
                    </h4>

                    {/* Specs Badges */}
                    <div className="flex items-center justify-center gap-4 mt-2 text-[11px] font-medium text-[#596780]">
                      <span>{selectedCar.seats} Seats</span>
                      <span>•</span>
                      <span>{selectedCar.transmission}</span>
                      <span>•</span>
                      <span>{selectedCar.fuel_type}</span>
                    </div>
                  </div>

                  {/* Customer Information Inputs */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-[#0B132A] uppercase tracking-wider">
                      Driver Information
                    </h5>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Pena"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-[5px] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3563E9] transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Email Address
                        </label>
                        {isUserLoggedIn && (
                          <span className="text-[10px] font-bold text-emerald-600">
                            Verified Logged-in Account (Locked)
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        readOnly={isUserLoggedIn}
                        placeholder="e.g. eleanor@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className={`w-full px-3.5 py-2 text-xs border rounded-[5px] transition-all ${
                          isUserLoggedIn
                            ? "bg-slate-100 border-slate-200 text-slate-600 font-semibold cursor-not-allowed"
                            : "bg-slate-50 border-slate-200 focus:bg-white focus:outline-none focus:border-[#3563E9]"
                        }`}
                      />
                    </div>

                    {/* Country / Region Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Country / Region
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-[5px] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3563E9] transition-all font-medium text-slate-800 cursor-pointer"
                      >
                        {availableCountries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Rental Duration (Days)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={rentalDays}
                        onChange={(e) => setRentalDays(Number(e.target.value))}
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-[5px] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3563E9] transition-all"
                      />
                    </div>
                  </div>

                  {/* Summary & Price Calculation Box */}
                  <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-[8px] space-y-2">
                    {searchFilter.isFilterActive && (
                      <div className="pb-2 mb-2 border-b border-blue-200/50 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-[#3563E9] shrink-0" />
                          <span className="font-semibold">Route:</span>
                          <span>
                            {searchFilter.pickupCity} →{" "}
                            {searchFilter.dropoffCity}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <Calendar className="w-3 h-3 text-[#3563E9] shrink-0" />
                          <span>
                            {searchFilter.pickupDate || "Today"} (
                            {searchFilter.pickupTime}) to{" "}
                            {searchFilter.dropoffDate || "3 Days"} (
                            {searchFilter.dropoffTime})
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Daily Rate:</span>
                      <span className="font-semibold">
                        ${selectedCar.price_per_day}.00
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Duration:</span>
                      <span className="font-semibold">{rentalDays} Days</span>
                    </div>
                    <div className="border-t border-blue-200/60 pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0B132A]">
                        Estimated Total Price:
                      </span>
                      <span className="text-xl font-extrabold text-[#3563E9]">
                        ${(selectedCar.price_per_day * rentalDays).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Drawer Footer (Fixed CTA Bar) */}
            {!bookingSuccess && (
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setSelectedCar(null)}
                  type="button"
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-[5px] text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="drawer-booking-form"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-[#3563E9] hover:bg-[#274CC0] text-white font-bold text-xs rounded-[5px] shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <span>Confirm & Rent Now</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

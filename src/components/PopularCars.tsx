"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Fuel, Gauge, Users, Check, X } from "lucide-react";
import { supabase, Car } from "@/lib/supabase";

export default function PopularCars() {
  const [activeTab, setActiveTab] = useState("Popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Modal State
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [rentalDays, setRentalDays] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const tabs = ["Popular", "Large Car", "Small Car", "Exclusive Car"];

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
      const txId = `#${Math.floor(100000000000 + Math.random() * 900000000000)}`;

      const { error } = await supabase.from("bookings").insert([
        {
          customer_name: customerName,
          customer_email: customerEmail,
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
        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
          setSelectedCar(null);
          setCustomerName("");
          setCustomerEmail("");
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
    if (activeTab === "Small Car") return car.type === "Sedan" || car.type === "Hatchback";
    if (activeTab === "Exclusive Car") return car.price_per_day >= 150 || car.type === "Sports" || car.type === "Electric";
    return true;
  });

  return (
    <section id="rental-details" className="w-full bg-[#F6F7F9] py-20 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-3 sm:mb-4">
            Most popular car rental deals
          </h2>
          <p className="text-[#596780] font-normal text-sm sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            A high-performing web-based car rental system powered by live Supabase PostgreSQL backend.
          </p>
        </div>

        {/* Category Tabs */}
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

        {/* Cars Grid - 3 cars per row with BIG car images */}
        {isLoading ? (
          <div className="py-24 text-center text-slate-500 font-medium">
            Loading live fleet data from Supabase...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredCars.map((car) => {
              const isFav = favorites.includes(car.id);
              return (
                <div
                  key={car.id}
                  className="bg-white rounded-[16px] p-6 sm:p-7 flex flex-col justify-between min-h-[460px] sm:min-h-[480px] border border-slate-200/80 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 relative group"
                >
                  {/* Top: Title & Favorite Heart */}
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-xl sm:text-2xl text-[#0B132A] tracking-tight truncate max-w-[260px]">
                          {car.name}
                        </h3>
                        <span className="text-xs sm:text-sm font-semibold text-[#596780]">
                          {car.brand} • {car.type}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
                        aria-label="Add to favorites"
                      >
                        <Heart
                          className={`w-6 h-6 ${isFav ? "fill-red-500 text-red-500" : "stroke-current"}`}
                        />
                      </button>
                    </div>

                    {/* Middle: Prominent BIG Car Image from Supabase */}
                    <div className="w-full h-52 sm:h-60 my-2 flex items-center justify-center relative">
                      <Image
                        src={car.image}
                        alt={car.name}
                        width={460}
                        height={260}
                        className="object-contain max-h-48 sm:max-h-56 w-full drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                        unoptimized={car.image.startsWith("http")}
                      />
                    </div>
                  </div>

                  {/* Bottom Group: Specs & Price Footer */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between w-full text-xs sm:text-sm text-[#596780] font-medium px-1">
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
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="font-bold text-2xl sm:text-3xl text-[#0B132A]">
                          ${car.price_per_day}
                        </span>
                        <span className="text-xs sm:text-sm font-normal text-[#596780]">
                          /day
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedCar(car)}
                        className="w-[125px] sm:w-[135px] h-11 sm:h-12 bg-[#3563E9] hover:bg-[#254EDB] text-white font-bold text-sm rounded-[8px] flex items-center justify-center transition-all shadow-sm cursor-pointer active:scale-95"
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

        {/* Bottom Count */}
        <div className="flex items-center justify-between mt-14 pt-4">
          <div className="mx-auto flex items-center gap-6">
            <button
              type="button"
              className="px-8 py-3.5 bg-[#3563E9] text-white font-bold text-sm rounded-[8px] shadow-md hover:bg-[#254EDB] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Show more car
            </button>
          </div>
        </div>
      </div>

      {/* Live Booking Modal Popup */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] max-w-[480px] w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h3>
                <p className="text-slate-600 text-sm">
                  Your reservation for <span className="font-semibold text-[#3563E9]">{selectedCar.name}</span> has been saved in the Supabase backend.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Rent {selectedCar.name}</h3>
                  <p className="text-xs text-slate-500">
                    Daily Rate: ${selectedCar.price_per_day}/day • {selectedCar.seats} Seats
                  </p>
                </div>

                <div className="w-full h-36 bg-slate-50 rounded-[10px] flex items-center justify-center p-2 relative overflow-hidden">
                  <Image
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    width={280}
                    height={160}
                    className="object-contain max-h-32 w-auto"
                    unoptimized={selectedCar.image.startsWith("http")}
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-[6px] focus:outline-none focus:border-[#3563E9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-[6px] focus:outline-none focus:border-[#3563E9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rental Duration (Days)</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-[6px] focus:outline-none focus:border-[#3563E9]"
                    />
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-[8px] flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">Estimated Total:</span>
                    <span className="font-bold text-lg text-[#3563E9]">
                      ${(selectedCar.price_per_day * rentalDays).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#3563E9] hover:bg-[#254EDB] text-white font-bold text-sm rounded-[6px] transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Processing Reservation..." : "Confirm & Book Now"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

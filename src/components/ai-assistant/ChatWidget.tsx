"use client";

import { CarRecommendation, useChatStore } from "@/store/useChatStore";
import { supabase, getStoredAuthUser } from "@/lib/supabase";
import {
  ArrowRight,
  Car as CarIcon,
  Loader2,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
  X,
  FileText,
  Zap,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// Formatter to render **bold text** and ![markdown images](url) visually
function FormattedMessageText({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) return <div key={lineIdx} className="h-1" />;

        // Detect and render markdown images ![alt](url)
        const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          const altText = imgMatch[1] || "Vehicle Image";
          const imgSrc = imgMatch[2];
          return (
            <div
              key={lineIdx}
              className="my-2 p-1.5 bg-white border border-slate-200/90 rounded-[8px] flex items-center justify-center overflow-hidden shadow-2xs"
            >
              <Image
                src={imgSrc}
                alt={altText}
                width={260}
                height={140}
                style={{ width: "auto", height: "auto" }}
                className="w-auto h-auto max-h-36 object-contain rounded-[4px] drop-shadow-xs"
                unoptimized
              />
            </div>
          );
        }

        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <p key={lineIdx} className="leading-relaxed">
            {parts.map((part, partIdx) => {
              if (
                part.startsWith("**") &&
                part.endsWith("**") &&
                part.length >= 4
              ) {
                const boldText = part.slice(2, -2);
                return (
                  <strong
                    key={partIdx}
                    className={`font-bold ${isUser ? "text-white" : "text-[#0B132A]"}`}
                  >
                    {boldText}
                  </strong>
                );
              }
              return <span key={partIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatWidget() {
  const {
    isOpen,
    messages,
    isLoading,
    toggleChat,
    addMessage,
    setLoading,
    clearChat,
  } = useChatStore();
  const [input, setInput] = useState("");
  const [selectedCarForBooking, setSelectedCarForBooking] =
    useState<CarRecommendation | null>(null);

  // Form states for inline booking form
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDays, setBookDays] = useState(3);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-fill logged in user email and name when booking opens in AI Chat
  useEffect(() => {
    if (selectedCarForBooking) {
      const stored = getStoredAuthUser();
      if (stored && stored.email) {
        setIsLoggedIn(true);
        if (stored.full_name) setBookName(stored.full_name);
        setBookEmail(stored.email);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [selectedCarForBooking]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, selectedCarForBooking]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    // Auto-close open booking form when user sends a new message!
    setSelectedCarForBooking(null);

    if (!textToSend) setInput("");
    addMessage(query, "user");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6),
        }),
      });

      const data = await response.json();
      if (data.response) {
        addMessage(data.response, "ai", data.cars);
      } else {
        addMessage(
          "Sorry, I encountered an issue checking the database.",
          "ai",
        );
      }

      if (data.openBookingFormForCar) {
        setSelectedCarForBooking(data.openBookingFormForCar);
      }
    } catch (err) {
      addMessage("Network connection issue. Please try again.", "ai");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  // Submit Inline Booking Form
  const handleInlineBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCarForBooking) return;

    setIsSubmittingBooking(true);
    try {
      const totalCost = selectedCarForBooking.price_per_day * bookDays;
      const cleanEmail = bookEmail.trim().toLowerCase();
      const cleanName = bookName.trim();
      const txId = `#AI-${Math.floor(1000000 + Math.random() * 9000000)}`;

      // 1. Insert directly into Supabase bookings table for real-time dashboard display!
      await supabase.from("bookings").insert([
        {
          customer_name: cleanName,
          customer_email: cleanEmail,
          car_id: selectedCarForBooking.id,
          car_name: selectedCarForBooking.name,
          car_image: selectedCarForBooking.image,
          duration: `${bookDays} Days`,
          total_amount: totalCost,
          payment_method: "AI Concierge",
          transaction_id: txId,
          status: "Success",
        },
      ]);

      // 2. Also send chat notification
      await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `My name is ${cleanName}, email is ${cleanEmail}, phone is ${bookPhone}. Booking ${selectedCarForBooking.name} for ${bookDays} days.`,
        }),
      });

      addMessage(
        `🎉 **Reservation Confirmed!**\n\nThank you **${cleanName}**! Your booking request for **${selectedCarForBooking.name}** (${bookDays} Days — $${totalCost}) has been saved. Our sales concierge will call **${bookPhone}** shortly!`,
        "ai",
      );
      setSelectedCarForBooking(null);
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          type="button"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#3563E9] hover:bg-[#274CC0] text-white shadow-[0px_8px_30px_rgba(53,99,233,0.4)] transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          aria-label="Open SwiftRide AI Assistant"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
          </span>
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Premium Brand-Styled Chat Window */}
      {isOpen && (
        <div className="flex h-[560px] w-88 sm:w-[410px] flex-col rounded-[10px] border border-slate-200 bg-white shadow-[0px_10px_40px_rgba(11,19,42,0.15)] transition-all duration-300 animate-in slide-in-from-bottom-4">
          {/* Header Bar (Gradient Accent: Deep Slate #0B132A to Royal Blue #3563E9) */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#0B132A] via-[#1E3A8A] to-[#3563E9] px-4 py-3 text-white border-b border-white/10 shrink-0 rounded-t-[10px]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[6px] bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20 shadow-xs">
                <CarIcon className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white leading-tight flex items-center gap-1.5">
                  <span>SwiftRide AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#FA8231]" />
                </h4>
                <p className="text-[10px] text-white/85 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Instant Car Recommendations</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                type="button"
                className="p-1 text-white/75 hover:text-white rounded-[4px] hover:bg-white/10 transition-colors cursor-pointer"
                title="Clear Conversation"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                onClick={toggleChat}
                type="button"
                className="p-1 text-white/75 hover:text-white rounded-[4px] hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body Stream */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#F6F7F9]">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={`flex flex-col max-w-[88%] rounded-[8px] px-3.5 py-2.5 text-xs shadow-2xs leading-relaxed ${
                    msg.sender === "user"
                      ? "ml-auto bg-[#3563E9] text-white rounded-tr-none font-medium"
                      : "mr-auto bg-white border border-slate-200/90 text-[#0B132A] rounded-tl-none"
                  }`}
                >
                  <FormattedMessageText
                    content={msg.text}
                    isUser={msg.sender === "user"}
                  />
                  <span
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === "user" ? "text-blue-200" : "text-slate-400"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Visual Car Cards Payload */}
                {msg.cars && msg.cars.length > 0 && (
                  <div className="space-y-2.5 pt-1 max-w-[95%]">
                    <p className="text-xs font-bold text-[#596780] px-1">
                      Available Live Vehicles ({msg.cars.length})
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {msg.cars.map((car) => (
                        <div
                          key={car.id}
                          className="bg-white rounded-[10px] border border-slate-200 p-3 shadow-sm hover:border-[#3563E9] transition-all flex items-center justify-between gap-3 group"
                        >
                          {/* Image */}
                          <div className="w-20 h-14 bg-[#F6F7F9] border border-slate-100 rounded-[6px] p-1 flex items-center justify-center shrink-0">
                            <Image
                              src={car.image}
                              alt={car.name}
                              width={70}
                              height={40}
                              style={{ width: "auto", height: "auto" }}
                              className="object-contain max-h-12"
                            />
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h5 className="font-bold text-[#0B132A] text-xs truncate">
                                {car.name}
                              </h5>
                              <span className="font-extrabold text-[#3563E9] text-xs shrink-0">
                                ${car.price_per_day}/day
                              </span>
                            </div>

                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                              {car.seats} Seats • {car.transmission} •{" "}
                              {car.fuel_type}
                            </p>

                            {/* Rent Now Action Button */}
                            <button
                              onClick={() => setSelectedCarForBooking(car)}
                              type="button"
                              className="mt-1.5 px-3 py-1 bg-[#3563E9] hover:bg-[#274CC0] text-white font-bold text-[10px] rounded-[5px] transition-all shadow-2xs flex items-center gap-1 active:scale-95 cursor-pointer"
                            >
                              <span>Rent Now</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Inline Booking Form Card when user clicks "Rent Now" */}
            {selectedCarForBooking && (
              <div className="bg-white rounded-[10px] border-2 border-[#3563E9] p-3.5 shadow-lg animate-in zoom-in-95 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <CarIcon className="w-4 h-4 text-[#3563E9]" />
                    <span className="font-bold text-xs text-[#0B132A]">
                      Booking: {selectedCarForBooking.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCarForBooking(null)}
                    type="button"
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form
                  onSubmit={handleInlineBookingSubmit}
                  className="space-y-2 text-xs"
                >
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-[5px] text-xs focus:bg-white focus:outline-none focus:border-[#3563E9]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5 flex items-center justify-between">
                        <span>Email Address</span>
                        {isLoggedIn && <span className="text-[9px] font-bold text-emerald-600">Locked</span>}
                      </label>
                      <input
                        type="email"
                        required
                        readOnly={isLoggedIn}
                        placeholder="john@example.com"
                        value={bookEmail}
                        onChange={(e) => setBookEmail(e.target.value)}
                        className={`w-full px-2.5 py-1.5 border rounded-[5px] text-xs transition-colors ${
                          isLoggedIn
                            ? "bg-slate-100 border-slate-200 text-slate-600 font-semibold cursor-not-allowed"
                            : "bg-slate-50 border-slate-200 focus:bg-white focus:outline-none focus:border-[#3563E9]"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 800-555-0199"
                        value={bookPhone}
                        onChange={(e) => setBookPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-[5px] text-xs focus:bg-white focus:outline-none focus:border-[#3563E9]"
                      />
                    </div>
                  </div>

                  <div className="p-2 bg-blue-50 border border-blue-100 rounded-[5px] flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      Estimated Total:
                    </span>
                    <span className="font-extrabold text-[#3563E9]">
                      ${selectedCarForBooking.price_per_day * bookDays}.00 (
                      {bookDays} Days)
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setSelectedCarForBooking(null)}
                      type="button"
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-[5px] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="px-3 py-1.5 bg-[#3563E9] hover:bg-[#274CC0] text-white font-bold rounded-[5px] text-xs transition-colors shadow-xs"
                    >
                      {isSubmittingBooking
                        ? "Saving..."
                        : "Confirm Reservation"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-600 mr-auto bg-white border border-slate-200 rounded-[8px] rounded-tl-none px-3.5 py-2.5 shadow-2xs text-xs">
                <Loader2 className="h-4 w-4 animate-spin text-[#3563E9]" />
                <span className="text-[11px] font-semibold text-slate-500">
                  SwiftRide AI searching database...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Buttons */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <button
              onClick={() => handleSend("Show available SUVs & luxury sedans")}
              type="button"
              className="px-2.5 py-1 bg-blue-50 text-[#3563E9] border border-blue-100 rounded-[5px] font-bold hover:bg-blue-100 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <CarIcon className="w-3.5 h-3.5 text-[#3563E9]" />
              <span>Available Vehicles</span>
            </button>
            <button
              onClick={() =>
                handleSend("What are the rental deposit & age requirements?")
              }
              type="button"
              className="px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-[5px] font-medium hover:bg-slate-100 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Deposit Policy</span>
            </button>
            <button
              onClick={() => handleSend("Recommend top available fleet for instant booking")}
              type="button"
              className="px-2.5 py-1 bg-amber-50 text-[#FA8231] border border-amber-100 rounded-[5px] font-bold hover:bg-amber-100 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#FA8231]" />
              <span>Instant Book</span>
            </button>
          </div>

          {/* Chat Input Field Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="flex gap-2 border-t border-slate-200 p-3 bg-white rounded-b-[10px]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for family SUVs, rates, or input details..."
              disabled={isLoading}
              className="flex-1 rounded-[5px] border border-slate-200 px-3 py-2 text-xs text-[#0B132A] placeholder:text-slate-400 focus:border-[#3563E9] focus:outline-none focus:ring-1 focus:ring-[#3563E9] disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-[#3563E9] hover:bg-[#274CC0] text-white transition-colors disabled:bg-slate-300 cursor-pointer shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

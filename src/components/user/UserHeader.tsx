"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Bell,
  Home,
  ChevronDown,
  Menu,
  ShieldCheck,
  ChevronsLeft,
  Car,
  LogOut,
} from "lucide-react";
import { supabase, getStoredAuthUser, setStoredAuthUser, AuthUser } from "@/lib/supabase";

interface UserHeaderProps {
  onOpenMobileSidebar: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function UserHeader({
  onOpenMobileSidebar,
  isCollapsed,
  onToggleCollapse,
}: UserHeaderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredAuthUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  const handleSignOut = async () => {
    setStoredAuthUser(null);
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4 w-full shadow-2xs">
      {/* Left: Logo + Toggle + Mobile Menu + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Brand Logo */}
        <Link href="/" className="hidden lg:flex items-center gap-2 pr-3 border-r border-slate-200 shrink-0">
          <span className="font-extrabold text-xl text-[#0B132A] tracking-tight">
            Swift<span className="text-[#3563E9]">Ride</span>
          </span>
          <span className="px-1.5 py-0.5 bg-blue-50 text-[#3563E9] text-[9px] font-bold rounded-[3px] border border-blue-100">
            User
          </span>
        </Link>

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          type="button"
          className="hidden lg:flex p-1.5 rounded-[5px] text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <ChevronsLeft
            className={`w-5 h-5 transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Mobile Sidebar Menu Button */}
        <button
          onClick={onOpenMobileSidebar}
          type="button"
          className="lg:hidden p-1.5 rounded-[5px] text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search your rentals, cars, or receipts..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-[5px] focus:outline-none focus:ring-1 focus:ring-[#3563E9] transition-all"
          />
        </div>
      </div>

      {/* Right Controls: CTAs + Home + Profile */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/#rental-details"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3563E9] hover:bg-[#274CC0] text-white text-xs font-bold rounded-[5px] transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Rent A Car</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Main Site</span>
        </Link>

        {/* User Profile Badge Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            type="button"
            className="flex items-center gap-2.5 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all text-slate-900 cursor-pointer shadow-2xs"
          >
            <div className="w-7 h-7 rounded-full bg-[#3563E9] text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.full_name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-left hidden md:block max-w-[120px]">
              <p className="text-xs font-bold text-[#0B132A] truncate leading-tight">
                {user?.full_name || "Customer"}
              </p>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                Verified Driver
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200/90 rounded-[10px] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 text-[#0B132A]">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3563E9] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {user?.full_name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#0B132A] truncate">
                    {user?.full_name || "Valued Customer"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>

              <div className="py-1">
                <Link
                  href="/user/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#3563E9] hover:bg-blue-50/70"
                >
                  <Car className="w-4 h-4 text-[#3563E9]" />
                  <span>My Active Rentals</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#3563E9] hover:bg-blue-50/70"
                >
                  <Home className="w-4 h-4 text-slate-500" />
                  <span>Back to Main Website</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={handleSignOut}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

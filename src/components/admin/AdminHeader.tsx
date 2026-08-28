"use client";

import {
  Bell,
  Check,
  ChevronDown,
  CreditCard,
  Maximize2,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export default function AdminHeader({ onOpenMobileSidebar }: AdminHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (US)");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileSidebar}
          type="button"
          className="lg:hidden p-1.5 rounded-[5px] text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar with ⌘K Badge */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-9 pr-12 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-[5px] focus:outline-none focus:ring-1 focus:ring-[#FA8231] focus:border-[#FA8231] transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-[3px] shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Language Selector Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="h-8 px-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-[5px] flex items-center gap-2 text-xs font-medium text-slate-700 transition-colors"
          >
            <Image
              src="/admin-dashboard/dashboard_15.webp"
              alt="USA Flag"
              width={16}
              height={16}
              className="rounded-full object-cover shrink-0"
            />
            <span className="truncate">{selectedLang}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-[6px] shadow-lg py-1 z-50 text-xs">
              {[
                {
                  name: "English (US)",
                  flag: "/admin-dashboard/dashboard_15.webp",
                },
                { name: "German", flag: "/admin-dashboard/dashboard_15.webp" },
                { name: "French", flag: "/admin-dashboard/dashboard_15.webp" },
                { name: "Spanish", flag: "/admin-dashboard/dashboard_15.webp" },
              ].map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => {
                    setSelectedLang(lang.name);
                    setIsLangOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      width={14}
                      height={14}
                      className="rounded-full object-cover"
                    />
                    <span>{lang.name}</span>
                  </div>
                  {selectedLang === lang.name && (
                    <Check className="w-3.5 h-3.5 text-[#FA8231]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 1st Action Button: Yellow / Orange (#FF9F43 matching map) */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF9F43] hover:bg-[#E08A33] text-white text-xs font-semibold rounded-[5px] shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New</span>
        </button>

        {/* 2nd Action Button: Dark Navy Blue (#092C4C matching map) */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#092C4C] hover:bg-[#143E6B] text-white text-xs font-semibold rounded-[5px] shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5 text-[#FF9F43]" />
          <span>POS</span>
        </button>

        <div className="hidden sm:block h-5 w-px bg-slate-200 my-auto" />

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 rounded-[5px] text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="hidden md:flex p-1.5 rounded-[5px] text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-1.5 rounded-[5px] text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-1.5 ring-white" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-[6px] shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">
                  Notifications
                </span>
                <span className="text-[10px] font-semibold text-[#FA8231] cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="py-2 space-y-1.5">
                <div className="p-2 rounded-[5px] bg-orange-50/50 hover:bg-orange-50 text-xs">
                  <p className="font-semibold text-slate-800">
                    New car booking #4166
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Range Rover booked
                  </p>
                  <span className="text-[10px] text-slate-400">5 mins ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative ml-0.5">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 sm:pr-2 rounded-[5px] hover:bg-slate-100 transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
              <Image
                src="/admin-dashboard/dashboard_16.webp"
                alt="Mike Witzel"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-[#0B132A] leading-tight">
                Mike Witzel
              </span>
              <span className="text-[10px] font-medium text-slate-500 leading-tight">
                Super Admin
              </span>
            </div>
            <ChevronDown className="hidden sm:block w-3 h-3 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-[6px] shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-1.5 border-b border-slate-100 sm:hidden">
                <p className="font-bold text-slate-900">Mike Witzel</p>
                <p className="text-[11px] text-slate-500">Super Admin</p>
              </div>
              <Link
                href="/admin/dashboard"
                onClick={() => setIsProfileOpen(false)}
                className="block px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Profile Settings
              </Link>
              <div className="my-1 border-t border-slate-100" />
              <Link
                href="/"
                onClick={() => setIsProfileOpen(false)}
                className="block px-3 py-1.5 text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

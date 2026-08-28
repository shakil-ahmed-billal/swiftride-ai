"use client";

import {
  Bell,
  Check,
  ChevronDown,
  CreditCard,
  Home,
  LogOut,
  Maximize2,
  Menu,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AuthUser,
  getStoredAuthUser,
  setStoredAuthUser,
  supabase,
} from "@/lib/supabase";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export default function AdminHeader({ onOpenMobileSidebar }: AdminHeaderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (US)");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = getStoredAuthUser();
      if (stored) {
        setUser(stored);
      } else {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              full_name:
                session.user.user_metadata?.full_name ||
                session.user.email?.split("@")[0] ||
                "Admin",
              role:
                session.user.email?.toLowerCase() === "admin@swiftride.com"
                  ? "admin"
                  : "user",
            });
          } else {
            setUser({
              id: "admin-default",
              email: "admin@swiftride.com",
              full_name: "Mike Witzel",
              role: "admin",
            });
          }
        });
      }
    };

    checkUser();

    const onAuthChanged = () => checkUser();
    window.addEventListener("swiftride-auth-changed", onAuthChanged);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          full_name:
            session.user.user_metadata?.full_name ||
            session.user.email?.split("@")[0] ||
            "Admin",
          role:
            session.user.email?.toLowerCase() === "admin@swiftride.com"
              ? "admin"
              : "user",
        });
      } else {
        checkUser();
      }
    });

    return () => {
      window.removeEventListener("swiftride-auth-changed", onAuthChanged);
      subscription.unsubscribe();
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setStoredAuthUser(null);
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    window.location.href = "/";
  };

  const displayName = user?.full_name || user?.email?.split("@")[0] || "Admin";
  const displayEmail = user?.email || "admin@swiftride.com";
  const userInitial = displayName.charAt(0).toUpperCase();

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

        {/* 1st Action Button: Yellow / Orange (#FF9F43) */}
        <Link
          href="/#rental-details"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF9F43] hover:bg-[#E08A33] text-white text-xs font-semibold rounded-[5px] shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Booking</span>
          <span className="sm:hidden">Add</span>
        </Link>

        {/* 2nd Action Button: Dark Navy Blue (#092C4C) */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#092C4C] hover:bg-[#143E6B] text-white text-xs font-semibold rounded-[5px] shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-[#FF9F43]" />
          <span className="hidden sm:inline">Main Site</span>
        </Link>

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
                    Live Supabase Bookings Active
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Real-time fleet tracking enabled
                  </p>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real User Profile Pill & Dropdown */}
        <div className="relative ml-0.5" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-[6px] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#FA8231] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {userInitial}
            </div>
            <div className="hidden sm:flex flex-col text-left max-w-[120px]">
              <span className="text-xs font-bold text-[#0B132A] leading-tight truncate">
                {displayName}
              </span>
              <span className="text-[10px] font-medium text-slate-500 leading-tight">
                Super Admin
              </span>
            </div>
            <ChevronDown className="hidden sm:block w-3 h-3 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/90 rounded-[10px] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 text-[#0B132A]">
              {/* Profile Card Header */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FA8231] text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                  {userInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#0B132A] truncate leading-tight">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#596780] truncate mt-0.5">
                    {displayEmail}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-[#FA8231] border border-orange-200/80 rounded-[4px] text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3 text-[#FA8231]" />
                      <span>Administrator</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="py-1">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#FA8231] hover:bg-orange-50/60 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Admin Dashboard</span>
                </Link>

                <Link
                  href="/"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#FA8231] hover:bg-orange-50/60 transition-colors"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Return to Website</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="my-1 border-t border-slate-100" />

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                type="button"
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
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

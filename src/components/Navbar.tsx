"use client";

import {
  AuthUser,
  getStoredAuthUser,
  setStoredAuthUser,
  supabase,
} from "@/lib/supabase";
import {
  Car,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial auth state from stored session or supabase
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
                "User",
              role:
                session.user.email?.toLowerCase() === "admin@swiftride.com"
                  ? "admin"
                  : "user",
            });
          } else {
            setUser(null);
          }
        });
      }
    };

    checkUser();

    // Listen for custom auth events
    const onAuthChanged = () => checkUser();
    window.addEventListener("swiftride-auth-changed", onAuthChanged);

    // Listen for supabase auth state changes
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
            "User",
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
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
    setUser(null);
    setProfileDropdownOpen(false);
    window.location.href = "/";
  };

  const isAdmin =
    user?.role === "admin" ||
    user?.email?.toLowerCase() === "admin@swiftride.com";

  return (
    <header className="absolute top-0 left-0 right-0 w-full z-50 bg-transparent text-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-white font-bold text-2xl lg:text-3xl tracking-tight"
        >
          Logo
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          <Link
            href="#home"
            className="text-white font-semibold text-base tracking-tight relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white"
          >
            Home
          </Link>
          <Link
            href="#how-it-works"
            className="text-white/85 font-medium text-base tracking-tight hover:text-white transition-colors"
          >
            How it Work
          </Link>
          <Link
            href="#rental-details"
            className="text-white/85 font-medium text-base tracking-tight hover:text-white transition-colors"
          >
            Rental Details
          </Link>
          <Link
            href="#why-choose-us"
            className="text-white/85 font-medium text-base tracking-tight hover:text-white transition-colors"
          >
            Why Choose Us
          </Link>
          <Link
            href="#testimonials"
            className="text-white/85 font-medium text-base tracking-tight hover:text-white transition-colors"
          >
            Testimonial
          </Link>
        </nav>

        {/* Desktop Auth Section */}
        {user ? (
          /* Profile Dropdown Trigger */
          <div
            className="hidden lg:relative lg:flex items-center"
            ref={dropdownRef}
          >
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              type="button"
              className="flex items-center gap-2.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-full transition-all text-white cursor-pointer group shadow-sm"
              aria-expanded={profileDropdownOpen}
            >
              {/* User Avatar / Initials */}
              <div className="w-7 h-7 rounded-full bg-[#3563E9] text-white font-bold text-xs flex items-center justify-center border border-white/30 shrink-0 shadow-xs">
                {user.full_name
                  ? user.full_name.charAt(0).toUpperCase()
                  : user.email?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* User Name & Role Status */}
              <div className="text-left max-w-[130px] xl:max-w-[150px]">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {user.full_name || user.email?.split("@")[0] || "My Profile"}
                </p>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="text-[10px] text-white/80 font-medium truncate capitalize">
                    {isAdmin ? "Administrator" : "Verified Driver"}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              <ChevronDown
                className={`w-3.5 h-3.5 text-white/80 group-hover:text-white transition-transform duration-200 ${
                  profileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Pure White Brand-Styled Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200/90 rounded-[10px] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 text-[#0B132A]">
                {/* Header: User Full Profile Info */}
                <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3563E9] text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm">
                    {user.full_name
                      ? user.full_name.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#0B132A] truncate leading-tight">
                      {user.full_name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-[#596780] truncate mt-0.5">
                      {user.email}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      {isAdmin ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-[5px] text-[10px] font-bold">
                          <ShieldCheck className="w-3 h-3 text-amber-600" />
                          <span>Administrator</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-[#3563E9] border border-blue-200/80 rounded-[5px] text-[10px] font-bold">
                          <ShieldCheck className="w-3 h-3 text-[#3563E9]" />
                          <span>Verified Driver</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dropdown Options */}
                <div className="py-1.5 space-y-0.5">
                  {isAdmin ? (
                    <>
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#0B132A] hover:text-[#3563E9] hover:bg-blue-50/70 transition-colors group"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#3563E9]" />
                        <span className="flex-1">Admin Dashboard</span>
                        <span className="px-1.5 py-0.5 bg-[#3563E9]/10 text-[#3563E9] text-[9px] font-bold rounded-[3px]">
                          Admin
                        </span>
                      </Link>

                      <Link
                        href="/admin/bookings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#0B132A] hover:text-[#3563E9] hover:bg-blue-50/70 transition-colors"
                      >
                        <Car className="w-4 h-4 text-emerald-600" />
                        <span>Manage All Rentals</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/user/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#0B132A] hover:text-[#3563E9] hover:bg-blue-50/70 transition-colors group"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#3563E9]" />
                        <span className="flex-1">User Dashboard</span>
                      </Link>

                      <Link
                        href="/user/dashboard#bookings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#0B132A] hover:text-[#3563E9] hover:bg-blue-50/70 transition-colors"
                      >
                        <Car className="w-4 h-4 text-emerald-600" />
                        <span>My Bookings & Rentals</span>
                      </Link>
                    </>
                  )}

                  <Link
                    href={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#0B132A] hover:text-[#3563E9] hover:bg-blue-50/70 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Account Settings</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 my-1" />

                {/* Sign Out Action */}
                <button
                  onClick={handleSignOut}
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Login & Register Buttons (Unauthenticated) */
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/register"
              className="text-white font-medium text-base tracking-tight underline underline-offset-4 hover:text-white/80 transition-colors"
            >
              Register
            </Link>

            <Link
              href="/login"
              className="px-6 py-2.5 bg-white text-[#3563E9] font-bold text-sm rounded-[5px] tracking-tight hover:bg-white/95 transition-all shadow-md active:scale-95"
            >
              Log In
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-[5px] transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132A]/98 backdrop-blur-xl px-6 py-5 space-y-4 border-t border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <Link
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-base py-1"
          >
            Home
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white font-medium text-base py-1"
          >
            How it Work
          </Link>
          <Link
            href="#rental-details"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white font-medium text-base py-1"
          >
            Rental Details
          </Link>
          <Link
            href="#why-choose-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white font-medium text-base py-1"
          >
            Why Choose Us
          </Link>
          <Link
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white font-medium text-base py-1"
          >
            Testimonial
          </Link>

          {/* Mobile Auth/Profile Section */}
          <div className="pt-4 border-t border-white/15">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3.5 bg-white text-[#0B132A] rounded-[10px] border border-slate-200/90 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#3563E9] text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {user.full_name
                      ? user.full_name.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="truncate flex-1">
                    <p className="text-sm font-bold text-[#0B132A] truncate">
                      {user.full_name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-[#596780] truncate">
                      {user.email}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-[#3563E9]">
                      {isAdmin ? "Administrator" : "Verified Member"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#3563E9] text-white text-xs font-semibold rounded-[5px] shadow-xs"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{isAdmin ? "Admin Panel" : "Dashboard"}</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    type="button"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-[5px] border border-red-200/80"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white underline text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-2 bg-white text-[#3563E9] font-bold text-sm rounded-[5px] shadow"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

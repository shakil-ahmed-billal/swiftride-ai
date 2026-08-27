"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className="text-white font-medium text-base tracking-tight underline underline-offset-4 hover:text-white/80 transition-colors"
          >
            Register
          </Link>

          <Link
            href="/admin/dashboard"
            className="px-6 py-2.5 bg-white text-[#3563E9] font-bold text-sm rounded-[6px] tracking-tight hover:bg-white/95 transition-all shadow-md active:scale-95"
          >
            Log In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-[6px] transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1E3A8A]/95 backdrop-blur-md px-6 py-5 space-y-4 border-t border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2">
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
          <div className="pt-4 border-t border-white/20 flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white underline text-sm font-medium"
            >
              Register
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-5 py-2 bg-white text-[#3563E9] font-bold text-sm rounded-[6px] shadow"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

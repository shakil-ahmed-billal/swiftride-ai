"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#3563E9] text-white relative z-50">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-[72px] lg:h-[80px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-white font-semibold text-2xl lg:text-[32px] tracking-tight"
        >
          Logo
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          <Link
            href="#home"
            className="text-white font-semibold text-base tracking-tight hover:opacity-90 transition-opacity"
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
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="#register"
            className="text-white/90 font-medium text-base tracking-tight underline hover:text-white transition-colors"
          >
            Register
          </Link>

          <span className="w-px h-5 bg-white/30"></span>

          <Link
            href="#login"
            className="w-[82px] h-[38px] bg-white rounded flex items-center justify-center text-[#3563E9] font-semibold text-sm tracking-tight hover:bg-white/90 transition-all shadow-sm"
          >
            Log In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#274CC0] px-6 py-4 space-y-3 border-t border-white/10 shadow-lg">
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
          <div className="pt-3 border-t border-white/20 flex items-center justify-between">
            <Link
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white underline text-sm font-medium"
            >
              Register
            </Link>
            <Link
              href="#login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-5 py-2 bg-white text-[#3563E9] font-semibold text-sm rounded shadow"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

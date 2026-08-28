import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B132A] text-white pt-12 sm:pt-16 pb-20 lg:pb-12 px-5 sm:px-8 md:px-16 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand & Vision Description */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/white-logo.png"
                alt="SwiftRide AI"
                width={200}
                height={55}
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </Link>
            <p className="font-normal text-xs sm:text-base text-slate-300 leading-relaxed sm:leading-[26px] max-w-[320px]">
              Our vision is to provide convenience and help increase your travel comfort with luxury and accessible rentals.
            </p>

            {/* Social media circle badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#3563E9] text-white rounded-full flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#3563E9] text-white rounded-full flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#3563E9] text-white rounded-full flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#linkedin"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#3563E9] text-white rounded-full flex items-center justify-center transition-colors shadow-2xs"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: About */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-white tracking-tight mb-4">
                About
              </h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#rental-details" className="hover:text-white transition-colors">
                    Rental details
                  </Link>
                </li>
                <li>
                  <Link href="#why-choose-us" className="hover:text-white transition-colors">
                    Why choose us
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white transition-colors">
                    Testimonial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Community */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-white tracking-tight mb-4">
                Community
              </h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <a href="#events" className="hover:text-white transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#partners" className="hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#news" className="hover:text-white transition-colors">
                    News & Media
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-white tracking-tight mb-4">
                Portals
              </h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link href="/user/dashboard" className="hover:text-white transition-colors">
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/dashboard" className="hover:text-white transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Line & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-base text-slate-400 font-semibold">
          <p>© 2026 SwiftRide AI. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

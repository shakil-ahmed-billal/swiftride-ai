"use client";

import { AuthUser, setStoredAuthUser, supabase } from "@/lib/supabase";
import {
  AlertCircle,
  ArrowRight,
  Car,
  Eye,
  EyeOff,
  Headphones,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.rpc("authenticate_user", {
        p_email: email,
        p_password: password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      const res = data as { success: boolean; error?: string; user?: AuthUser };
      if (!res.success) {
        setErrorMessage(res.error || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      if (res.user) {
        setStoredAuthUser(res.user);
        if (
          res.user.role === "admin" ||
          res.user.email?.toLowerCase() === "admin@swiftride.com"
        ) {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/user/dashboard";
        }
      } else {
        window.location.href = "/user/dashboard";
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred during log in.");
      }
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "apple") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/admin/dashboard`,
        },
      });
      if (error) setErrorMessage(error.message);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-x-hidden lg:overflow-hidden bg-[#0B132A]">
      {/* 1. Full Screen Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/login-page-bg.jpg"
          alt="SwiftRide Login Backdrop"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-[#0B132A]/30 lg:hidden z-1" />
      </div>

      {/* 2. Main Two-Column Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-6 sm:py-8 lg:py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full">
        {/* ================= LEFT SIDE DIV ================= */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between h-full">
          {/* Top Content: Headline, Subtitle, 3 Value Pillars, Cursive Accent */}
          <div className="space-y-4 text-white">
            {/* Main Headline */}
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] tracking-tight leading-[1.12]">
              Your Journey <br />
              Starts Here
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 font-normal text-xs sm:text-sm lg:text-base leading-relaxed max-w-[430px]">
              Rent a car, explore new destinations and create unforgettable
              memories with complete freedom.
            </p>

            {/* 3 Value Pillars */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <Car className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">
                  Wide Range of Vehicles
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">
                  Safe & Secure Booking
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <Headphones className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">
                  24/7 Customer Support
                </span>
              </div>
            </div>

            {/* Handwritten Cursive Accent */}
            <div className="pt-2 hidden sm:block">
              <div className="font-caveat text-2xl lg:text-3xl text-white font-bold leading-tight -rotate-2">
                <div>Drive</div>
                <div className="text-white/90">A Better Tomorrow</div>
                <svg
                  className="w-24 h-2.5 text-white/80 mt-0.5"
                  viewBox="0 0 100 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C30 2 70 2 98 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Content: 3 Metric Counters */}
          <div className="pt-8 lg:pt-0 flex items-center gap-8 sm:gap-14 text-white">
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                10K+
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-white/80">
                Happy Customers
              </div>
            </div>

            <div className="border-l border-white/20 pl-8 sm:pl-14 space-y-0.5">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                100%
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-white/80">
                Trusted Platform
              </div>
            </div>

            <div className="border-l border-white/20 pl-8 sm:pl-14 space-y-0.5 hidden sm:block">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                50+
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-white/80">
                Cities Covered
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE DIV ================= */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between items-center lg:items-end h-full">
          {/* Top Right Auth Switch */}
          <div className="w-full max-w-[450px] flex justify-end text-xs sm:text-sm font-medium">
            <span className="text-slate-600">Don&apos;t have an account? </span>
            <Link
              href="/register"
              className="text-[#3563E9] font-bold hover:underline ml-1"
            >
              Register
            </Link>
          </div>

          {/* Center Form */}
          <div className="w-full max-w-[450px] bg-transparent p-0 sm:p-2 lg:p-3 my-auto">
            {/* Header / Title */}
            <div className="mb-4">
              <span className="text-[#3563E9] text-xs font-bold tracking-wide block mb-1">
                Welcome back
              </span>
              <h2 className="text-2xl sm:text-[26px] font-bold text-[#0B132A] tracking-tight">
                Log in to your account
              </h2>
              <p className="text-[#596780] text-xs sm:text-sm font-normal mt-1 leading-relaxed">
                Access your bookings, manage your rentals and enjoy a seamless
                experience.
              </p>
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-[5px] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#0B132A]">
                  Email address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white text-xs sm:text-sm font-medium text-slate-800 border border-slate-200 rounded-[5px] focus:outline-none focus:border-[#3563E9] transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#0B132A]">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white text-xs sm:text-sm font-medium text-slate-800 border border-slate-200 rounded-[5px] focus:outline-none focus:border-[#3563E9] transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-[3px] text-[#3563E9] focus:ring-0 border-slate-300 cursor-pointer accent-[#3563E9]"
                  />
                  <span>Remember me</span>
                </label>

                <Link
                  href="/admin/dashboard"
                  className="text-xs font-semibold text-[#3563E9] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#3563E9] hover:bg-[#254EDB] text-white font-bold text-xs sm:text-sm rounded-[5px] shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-1 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Log In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-transparent px-3 text-[11px] font-medium text-slate-500 shrink-0">
                  Or continue with
                </span>
                <div className="border-t border-slate-200 w-full"></div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleOAuthSignIn("google")}
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 rounded-[5px] hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  onClick={() => handleOAuthSignIn("apple")}
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 rounded-[5px] hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 fill-current text-slate-900"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.74-.88 2.76 1.01.08 2.04-.51 2.58-1.26z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              {/* Terms & Privacy */}
              <p className="text-center text-[10px] text-slate-500 pt-1 leading-relaxed">
                By logging in, you agree to our{" "}
                <Link
                  href="#"
                  className="text-[#3563E9] font-medium hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-[#3563E9] font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

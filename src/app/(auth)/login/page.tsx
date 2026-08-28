"use client";

import { AuthUser, setStoredAuthUser, supabase } from "@/lib/supabase";
import {
  AlertCircle,
  ArrowRight,
  Car,
  Eye,
  EyeOff,
  Headphones,
  Home,
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
    <div className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-x-hidden lg:overflow-hidden bg-white lg:bg-[#0B132A]">
      {/* 1. Full Screen Background Image (Desktop Only) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/login-page-bg.jpg"
          alt="SwiftRide Login Backdrop"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. Main Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-16 py-6 sm:py-8 lg:py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-center">
        {/* ================= LEFT SIDE DIV (Hidden on Mobile) ================= */}
        <div className="hidden lg:flex lg:col-span-7 xl:col-span-7 flex-col justify-between h-full">
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

        {/* ================= RIGHT SIDE / MOBILE CENTERED FORM ================= */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between items-center lg:items-end w-full">
          {/* Mobile Header with Logo & Back to Home */}
          <div className="lg:hidden flex items-center justify-between w-full max-w-[450px] mb-6">
            <Link href="/">
              <Image
                src="/color-logo.png"
                alt="SwiftRide AI"
                width={150}
                height={42}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-[5px] font-semibold text-xs transition-all"
            >
              <Home className="w-3.5 h-3.5 text-[#3563E9]" />
              <span>Home</span>
            </Link>
          </div>

          {/* Desktop Top Right Auth Switch + Back to Home Button */}
          <div className="hidden lg:flex w-full max-w-[450px] items-center justify-between text-xs sm:text-sm font-medium">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-slate-700 hover:text-[#3563E9] rounded-[5px] border border-slate-200 shadow-2xs font-semibold text-xs transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#3563E9]" />
              <span>Back to Home</span>
            </Link>

            <div>
              <span className="text-slate-600">Don&apos;t have an account? </span>
              <Link
                href="/register"
                className="text-[#3563E9] font-bold hover:underline ml-1"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Center Form */}
          <div className="w-full max-w-[450px] bg-white lg:bg-transparent p-0 sm:p-2 lg:p-3 my-auto">
            {/* Header / Title */}
            <div className="mb-5">
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
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-[5px] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#0B132A]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[5px] text-xs sm:text-sm text-[#0B132A] placeholder:text-slate-400 focus:outline-none focus:border-[#3563E9] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#0B132A]">
                    Password
                  </label>
                  <a
                    href="#forgot-password"
                    className="text-[11px] text-[#3563E9] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-[5px] text-xs sm:text-sm text-[#0B132A] placeholder:text-slate-400 focus:outline-none focus:border-[#3563E9] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-[4px] border-slate-300 text-[#3563E9] focus:ring-[#3563E9]"
                  />
                  <span className="text-xs text-[#596780]">
                    Remember this device
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#3563E9] hover:bg-[#254EDB] text-white font-bold text-xs sm:text-sm rounded-[5px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white lg:bg-[#F6F7F9] text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthSignIn("google")}
                className="py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-[5px] flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn("apple")}
                className="py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-[5px] flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.94 1.07.08 2.14-.55 2.79-1.28z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Mobile Bottom Register Link */}
            <div className="lg:hidden text-center mt-6 text-xs text-slate-600">
              <span>Don&apos;t have an account? </span>
              <Link
                href="/register"
                className="text-[#3563E9] font-bold hover:underline ml-1"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

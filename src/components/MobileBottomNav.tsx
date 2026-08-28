"use client";

import { Calendar, Compass, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthUser, getStoredAuthUser } from "@/lib/supabase";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = getStoredAuthUser();
      setUser(stored);
    };

    checkUser();
    window.addEventListener("swiftride-auth-changed", checkUser);
    return () => {
      window.removeEventListener("swiftride-auth-changed", checkUser);
    };
  }, []);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Explore",
      href: "/#rental-details",
      icon: Compass,
      isActive: false,
    },
    {
      label: "Bookings",
      href: user ? "/user/dashboard" : "/login",
      icon: Calendar,
      isActive: pathname === "/user/dashboard",
    },
    {
      label: "Profile",
      href: user
        ? user.role === "admin"
          ? "/admin/dashboard"
          : "/user/dashboard"
        : "/login",
      icon: User,
      isActive: pathname.includes("dashboard") || pathname.includes("login"),
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2.5 px-6 flex items-center justify-between shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              item.isActive
                ? "text-[#3563E9] font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
            <span className="text-[10px] leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

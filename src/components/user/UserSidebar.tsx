"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Car,
  Heart,
  UserCheck,
  CreditCard,
  Home,
  LogOut,
  ShieldCheck,
  Award,
  PhoneCall,
  X,
} from "lucide-react";
import { getStoredAuthUser, AuthUser } from "@/lib/supabase";

interface UserSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function UserSidebar({
  isOpenMobile = false,
  onCloseMobile,
  isCollapsed = false,
}: UserSidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = getStoredAuthUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  const navGroups = [
    {
      group: "Main",
      items: [
        { label: "User Dashboard", href: "/user/dashboard", icon: LayoutGrid },
        { label: "My Bookings & Rentals", href: "/user/dashboard#bookings", icon: Car },
      ],
    },
    {
      group: "My Account",
      items: [
        { label: "Saved Favorites", href: "/user/dashboard#favorites", icon: Heart },
        { label: "Driver Verification", href: "/user/dashboard#verification", icon: UserCheck },
        { label: "Billing & Cards", href: "/user/dashboard#billing", icon: CreditCard },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 bg-white border-r border-slate-200/80 shadow-[4px_0px_20px_0px_rgba(0,0,0,0.02)] flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        } ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Close Bar */}
        {isOpenMobile && (
          <div className="h-12 px-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white lg:hidden">
            <span className="font-bold text-[#0B132A] text-xs">Customer Menu</span>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-[5px] text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2.5 py-1 text-xs font-bold text-[#1A2F55] tracking-tight uppercase text-[10px]">
                  {group.group}
                </div>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === pathname ||
                    (item.href === "/user/dashboard" && pathname === "/user/dashboard");

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-xs transition-all duration-150 ${
                        isActive
                          ? "bg-blue-50 text-[#3563E9] font-bold"
                          : "text-slate-600 hover:text-[#3563E9] hover:bg-slate-50 font-semibold"
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0 text-[#3563E9]" />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Status / Roadside Support Card at Bottom */}
        <div className="p-3 border-t border-slate-100 shrink-0 bg-slate-50/50">
          {!isCollapsed ? (
            <div className="p-3 bg-[#0B132A] text-white rounded-[8px] space-y-1.5 shadow-sm">
              <div className="flex items-center gap-1 text-[#FA8231] font-bold text-[11px]">
                <Award className="w-3.5 h-3.5" />
                <span>Gold Member</span>
              </div>
              <p className="text-[11px] text-white/80">Need 24/7 Roadside Assistance?</p>
              <a
                href="tel:+18005550199"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#3563E9] bg-white px-2.5 py-1 rounded-[4px] mt-1"
              >
                <PhoneCall className="w-3 h-3 text-[#3563E9]" />
                <span>Call Support</span>
              </a>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-[6px] bg-[#3563E9] text-white font-bold text-xs flex items-center justify-center mx-auto shadow-2xs">
              SR
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

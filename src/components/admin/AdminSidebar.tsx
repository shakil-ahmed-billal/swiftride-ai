"use client";

import {
  ArrowLeftRight,
  Award,
  Barcode,
  Box,
  Boxes,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  Clock,
  FileText,
  Gift,
  KeyRound,
  Layers,
  LayoutGrid,
  LayoutList,
  Monitor,
  Package,
  Percent,
  PlusSquare,
  QrCode,
  Receipt,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Ticket,
  TrendingDown,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface AdminSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  hasChevronRight?: boolean;
  hasChevronDown?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    group: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutGrid,
        hasChevronDown: true,
      },
      {
        label: "Super Admin",
        href: "#",
        icon: KeyRound,
        hasChevronRight: true,
      },
    ],
  },
  {
    group: "Inventory",
    items: [
      { label: "Products", href: "#", icon: Package },
      { label: "Create Product", href: "#", icon: PlusSquare },
      { label: "Expired Products", href: "#", icon: Clock },
      { label: "Low Stocks", href: "#", icon: TrendingDown },
      { label: "Category", href: "#", icon: LayoutList },
      { label: "Sub Category", href: "#", icon: Boxes },
      { label: "Brands", href: "#", icon: Award },
      { label: "Units", href: "#", icon: Box },
      { label: "Variant Attributes", href: "#", icon: SlidersHorizontal },
      { label: "Warranties", href: "#", icon: ShieldCheck },
      { label: "Print Barcode", href: "#", icon: Barcode },
      { label: "Print QR Code", href: "#", icon: QrCode },
    ],
  },
  {
    group: "Stock",
    items: [
      { label: "Manage Stock", href: "#", icon: Layers },
      { label: "Stock Adjustment", href: "#", icon: SlidersHorizontal },
      { label: "Stock Transfer", href: "#", icon: ArrowLeftRight },
    ],
  },
  {
    group: "Sales",
    items: [
      { label: "Sales", href: "#", icon: ShoppingCart, hasChevronRight: true },
      { label: "Invoices", href: "#", icon: FileText },
      { label: "Sales Return", href: "#", icon: RotateCcw },
      { label: "Quotation", href: "#", icon: Receipt },
      { label: "POS", href: "#", icon: Monitor, hasChevronRight: true },
    ],
  },
  {
    group: "Promo",
    items: [
      { label: "Coupons", href: "#", icon: Ticket },
      { label: "Gift Card", href: "#", icon: Gift },
      { label: "Discount", href: "#", icon: Percent, hasChevronRight: true },
    ],
  },
];

export default function AdminSidebar({
  isOpenMobile = false,
  onCloseMobile,
  isCollapsed: externalIsCollapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const isCollapsed =
    externalIsCollapsed !== undefined
      ? externalIsCollapsed
      : internalIsCollapsed;
  const toggleCollapse =
    onToggleCollapse || (() => setInternalIsCollapsed(!internalIsCollapsed));

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
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-200/80 shadow-[4px_0px_20px_0px_rgba(0,0,0,0.02)] flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        } ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Collapse Button: Exactly 50% inside, 50% outside right border line */}
        <button
          onClick={toggleCollapse}
          type="button"
          className="hidden lg:flex absolute -right-2.5 top-6 z-50 w-5 h-5 rounded-full bg-[#FA8231] hover:bg-[#E06D1F] text-white items-center justify-center border-2 border-white shadow-xs transition-transform active:scale-90 cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <ChevronsLeft
            className={`w-3 h-3 transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Brand Header with Larger Logo */}
        <div className="h-16 px-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white relative">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 overflow-hidden py-1"
          >
            {isCollapsed ? (
              <div className="w-8 h-8 rounded-[6px] bg-[#FFF5ED] border border-[#FA8231]/30 text-[#FA8231] font-extrabold text-sm flex items-center justify-center shadow-2xs shrink-0 mx-auto">
                SR
              </div>
            ) : (
              <Image
                src="/admin-dashboard/dashboard_1.webp"
                alt="SwiftRide Logo"
                width={130}
                height={40}
                className="h-9 w-auto object-contain transition-all"
                priority
              />
            )}
          </Link>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-[5px] text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
          {navGroups.map((group, groupIdx) => (
            <div key={group.group} className="space-y-1">
              {/* Category Header Label */}
              {!isCollapsed && (
                <div className="px-2.5 py-1 text-xs font-bold text-[#1A2F55] tracking-tight">
                  {group.group}
                </div>
              )}

              {/* Navigation Items */}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === pathname ||
                    (item.href !== "#" &&
                      item.href !== "/" &&
                      pathname?.startsWith(item.href || ""));

                  return (
                    <Link
                      key={item.label}
                      href={item.href || "#"}
                      onClick={() => {
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={`group flex items-center justify-between px-2.5 py-2 rounded-[6px] text-xs transition-all duration-150 ${
                        isActive
                          ? "bg-[#FFF5ED] text-[#FA8231] font-semibold"
                          : "text-[#4B586E] hover:text-[#FA8231] hover:bg-slate-50 font-medium"
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? "text-[#FA8231]"
                              : "text-[#64748B] group-hover:text-[#FA8231]"
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {/* Badges / Chevrons */}
                      {!isCollapsed && (
                        <div>
                          {item.hasChevronDown && isActive && (
                            <div className="w-4 h-4 rounded-full bg-[#FFEAD8] text-[#FA8231] flex items-center justify-center">
                              <ChevronDown className="w-3 h-3" />
                            </div>
                          )}
                          {item.hasChevronRight && (
                            <div className="w-4 h-4 rounded-full bg-[#F3F5F9] text-slate-400 group-hover:text-slate-600 flex items-center justify-center">
                              <ChevronRight className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divider between sections */}
              {groupIdx < navGroups.length - 1 && (
                <div className="pt-2 border-b border-slate-100/90" />
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import StatCards from "@/components/admin/StatCards";
import BestSeller from "@/components/admin/BestSeller";
import RecentTransactions from "@/components/admin/RecentTransactions";
import SalesAnalytics from "@/components/admin/SalesAnalytics";
import SalesByCountries from "@/components/admin/SalesByCountries";

export const metadata: Metadata = {
  title: "Admin Dashboard | SwiftRide AI",
  description:
    "Comprehensive car rental store analytics, best seller vehicles, recent transactions, and sales performance.",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      {/* 1. Greeting & Top Metric Cards */}
      <StatCards />

      {/* 2. Middle Row: Best Seller (Left) & Recent Transactions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-4 xl:col-span-4">
          <BestSeller />
        </div>
        <div className="lg:col-span-8 xl:col-span-8">
          <RecentTransactions />
        </div>
      </div>

      {/* 3. Bottom Row: Sales Analytics Chart (Left) & Sales by Countries (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-8 xl:col-span-8">
          <SalesAnalytics />
        </div>
        <div className="lg:col-span-4 xl:col-span-4">
          <SalesByCountries />
        </div>
      </div>
    </div>
  );
}

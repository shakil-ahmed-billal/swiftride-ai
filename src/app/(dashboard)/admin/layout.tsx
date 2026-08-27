"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col antialiased">
      {/* Sidebar Navigation */}
      <AdminSidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main App Canvas */}
      <div className="lg:pl-64 flex flex-col min-h-screen flex-1">
        {/* Sticky Top Navbar */}
        <AdminHeader
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Page Content with Clean, Consistent Padding */}
        <main className="flex-1 p-3.5 sm:p-4 md:p-5 max-w-[1600px] w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}

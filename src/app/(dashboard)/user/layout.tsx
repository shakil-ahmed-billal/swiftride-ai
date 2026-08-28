"use client";

import AdminFooter from "@/components/admin/AdminFooter";
import UserHeader from "@/components/user/UserHeader";
import UserSidebar from "@/components/user/UserSidebar";
import React, { useEffect, useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("swiftride_user_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {}
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("swiftride_user_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col antialiased">
      {/* 1. 100% Full Width Top Header */}
      <UserHeader
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* 2. Full Height Left Sidebar below Header */}
      <UserSidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* 3. Main App Canvas with Top Padding & Dynamic Sidebar Shift */}
      <div
        className={`flex flex-col min-h-screen flex-1 pt-16 transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen text-slate-900">
      {/* 2. Sidebar สูงเต็มจอ */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* กล่องฝั่งขวา: แสดงรูปพื้นหลังแบบเต็ม 100% */}
      <div className="flex flex-col flex-1 min-w-0 relative bg-custom-tech">
        {/* 1. Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* 4. Body Area / Main */}
        <main className="flex-1 p-6 relative z-10">
          {children}
        </main>

        {/* 3. Footer */}
        <Footer />
      </div>
    </div>
  );
}
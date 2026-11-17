"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { NavigationProvider } from "@/context/NavigationContext";
import { AlertProvider } from "@/context/AlertContext";

// รายชื่อหน้าที่ไม่ต้องการแสดง Sidebar, Navbar และ Footer
const NO_SHELL_ROUTES = ["/login"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const isBlankLayout = NO_SHELL_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <AlertProvider>
      <NavigationProvider>
        {isBlankLayout ? (
          // Layout สำหรับหน้า Public (เช่น Login)
          <main className="min-h-screen w-full bg-custom-tech text-slate-900">
            {children}
          </main>
        ) : (
          // Layout หลักสำหรับหน้า Private (Dashboard)
          <div className="flex min-h-screen text-slate-900">
            <Sidebar isOpen={isSidebarOpen} />

            <div className="flex flex-col flex-1 min-w-0 relative bg-custom-tech">
              <Navbar onToggleSidebar={toggleSidebar} />
              <main className="flex-1 p-6 relative z-10">{children}</main>
              <Footer />
            </div>
          </div>
        )}
      </NavigationProvider>
    </AlertProvider>
  );
}
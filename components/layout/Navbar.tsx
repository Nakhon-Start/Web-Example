"use client";

import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";
import pkg from "@/package.json";
interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();
  const { showConfirm } = useAlert();

  const handleLogout = async () => {
    const confirmed = await showConfirm({
      title: "ออกจากระบบ?",
      message: `คุณต้องการออกจากระบบ ${pkg.name} ใช่หรือไม่`,
      confirmText: "ออกจากระบบ",
      cancelText: "ยกเลิก",
      isDanger: true,
    });

    if (confirmed) {
      // ลบ Cookie Token โดยตั้งค่า max-age=0
      document.cookie = `${pkg.name}_token=; path=/; max-age=0; SameSite=Lax`;
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* ฝั่งซ้าย: ปุ่มพับ/เปิด Sidebar */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="font-semibold text-slate-700 hidden sm:inline">
          Dashboard Overview
        </span>
      </div>

      {/* ฝั่งขวา: ข้อมูลผู้ใช้และปุ่ม Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-700">Admin</span>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
          title="ออกจากระบบ"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </header>
  );
}

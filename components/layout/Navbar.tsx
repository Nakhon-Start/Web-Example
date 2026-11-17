"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ข้อมูลจำลอง (ภายหลังสามารถดึงจาก Session / Auth Context หรือ Props มาแทนที่ได้)
  const user = {
    name: "Nakhon",
    role: "IT Administrator",
  };

  // ปิด Dropdown อัตโนมัติเมื่อคลิกพื้นที่อื่นนอกเมนู
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // เพิ่ม Logic ล้าง Token / Session ตรงนี้ก่อนเปลี่ยนหน้า
    console.log("Logging out...");
    router.push("/login");
  };

  return (
<header className="h-16 bg-white/75 backdrop-blur-md text-slate-800 px-4 flex items-center justify-between border-b border-slate-200/80 sticky top-0 z-20">
      {/* ฝั่งซ้าย: ปุ่มพับ Sidebar + ชื่อหน้า */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
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

        <span className="font-semibold text-base text-slate-600">
          Dashboard Overview
        </span>
      </div>

      {/* ฝั่งขวา: ปุ่ม Profile & Dropdown Menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-3 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          {/* 1. ไอคอน User */}
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* 2. ชื่อ และ 3. Role */}
          <div className="text-left hidden sm:block">
            <div className="text-sm font-semibold text-slate-800 leading-tight">
              {user.name}
            </div>
            <div className="text-xs text-slate-500">{user.role}</div>
          </div>

          {/* ไอคอนลูกศรชี้ลง */}
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* กล่องเมนู Dropdown เมื่อคลิกปุ่ม Profile */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
            {/* ส่วนแสดงข้อมูลผู้ใช้ (แสดงชัดเจนทั้งบนจอคอมและมือถือ) */}
            <div className="px-4 py-2.5 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800">
                {user.name}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                {user.role}
              </span>
            </div>

            {/* 4. ปุ่ม Logout */}
            <div className="px-2 pt-1.5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer font-medium"
              >
                <svg
                  className="w-4 h-4 shrink-0"
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
                ออกจากระบบ (Logout)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
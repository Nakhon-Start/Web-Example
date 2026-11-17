"use client";

import React, { useEffect } from "react";
import { AlertType } from "./AlertBanner";

interface AlertModalProps {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  duration?: number; // ระยะเวลาปิดอัตโนมัติ (หน่วยมิลลิวินาที เช่น 3000 = 3 วินาที, 0 = ไม่ปิดอัตโนมัติ)
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AlertModal({
  isOpen,
  type,
  title,
  message,
  confirmText = "ตกลง",
  cancelText = "ยกเลิก",
  isDanger = false,
  duration = 3000,
  onConfirm,
  onCancel,
}: AlertModalProps) {
  // ปิดอัตโนมัติเมื่อครบเวลา (ทำงานเฉพาะที่ไม่ใช่โหมดตัดสินใจ confirm และ duration > 0)
  const shouldAutoClose = isOpen && type !== "confirm" && duration > 0;

  useEffect(() => {
    if (!shouldAutoClose) return;

    const timer = setTimeout(() => {
      onConfirm();
    }, duration);

    return () => clearTimeout(timer);
  }, [shouldAutoClose, duration, onConfirm]);

  if (!isOpen) return null;

  const iconConfigs: Record<
    AlertType,
    { ring: string; bg: string; text: string; svg: React.ReactNode }
  > = {
    success: {
      ring: "ring-emerald-100",
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      svg: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      ring: "ring-red-100",
      bg: "bg-red-100",
      text: "text-red-600",
      svg: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      ring: "ring-amber-100",
      bg: "bg-amber-100",
      text: "text-amber-600",
      svg: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    info: {
      ring: "ring-blue-100",
      bg: "bg-blue-100",
      text: "text-blue-600",
      svg: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    confirm: {
      ring: isDanger ? "ring-red-100" : "ring-indigo-100",
      bg: isDanger ? "bg-red-100" : "bg-indigo-100",
      text: isDanger ? "text-red-600" : "text-indigo-600",
      svg: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const currentIcon = iconConfigs[type];

  const getConfirmButtonColor = () => {
    if (isDanger || type === "error") return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
    if (type === "success") return "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500";
    if (type === "warning") return "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500";
    return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-6 text-center">
        {/* ปุ่มกากบาทมุมขวาบน */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="ปิด"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ไอคอนวงกลมตรงกลาง */}
        <div
          className={`mx-auto mb-4 w-14 h-14 rounded-full ring-8 flex items-center justify-center ${currentIcon.ring} ${currentIcon.bg} ${currentIcon.text}`}
        >
          {currentIcon.svg}
        </div>

        {/* หัวข้อและรายละเอียด */}
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        {message && (
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">{message}</p>
        )}

        {/* ปุ่มกดด้านล่าง */}
        <div className="mt-6 flex items-center gap-3">
          {type === "confirm" && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          )}

          {/* ปุ่มตกลง พร้อมขีดนับถอยหลังด้านล่างปุ่ม */}
          <button
            type="button"
            onClick={onConfirm}
            className={`relative overflow-hidden flex-1 py-2.5 px-4 rounded-xl text-sm font-medium text-white shadow-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${getConfirmButtonColor()} `}
          >
            <span className="relative z-10">{confirmText}</span>

            {/* แถบขีดนับถอยหลัง 3 วินาที */}
            {shouldAutoClose && (
              <span
                key={`${title}-${duration}`}
                style={{ animationDuration: `${duration}ms` }}
                className="absolute bottom-0 left-0 h-1 bg-white/60 animate-countdown-bar"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
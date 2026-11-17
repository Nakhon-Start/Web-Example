"use client";

import React from "react";

export type AlertType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "confirm";

interface AlertBannerProps {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function AlertBanner({
  type,
  title,
  message,
  onClose,
  onConfirm,
  onCancel,
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
}: AlertBannerProps) {
  const styles: Record<
    AlertType,
    { container: string; iconBg: string; titleColor: string; icon: React.ReactNode }
  > = {
    success: {
      container: "bg-emerald-50/90 border-emerald-200 text-emerald-900",
      iconBg: "bg-emerald-100 text-emerald-600",
      titleColor: "text-emerald-900",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      container: "bg-red-50/90 border-red-200 text-red-900",
      iconBg: "bg-red-100 text-red-600",
      titleColor: "text-red-900",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      container: "bg-amber-50/90 border-amber-200 text-amber-900",
      iconBg: "bg-amber-100 text-amber-600",
      titleColor: "text-amber-900",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    info: {
      container: "bg-blue-50/90 border-blue-200 text-blue-900",
      iconBg: "bg-blue-100 text-blue-600",
      titleColor: "text-blue-900",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    confirm: {
      container: "bg-indigo-50/95 border-indigo-200 text-slate-900",
      iconBg: "bg-indigo-100 text-indigo-600",
      titleColor: "text-slate-900",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const current = styles[type];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3.5 p-4 rounded-xl border backdrop-blur-sm shadow-xs transition-all ${current.container}`}
    >
      {/* ไอคอนสถานะ */}
      <div className={`p-2 rounded-lg shrink-0 ${current.iconBg}`}>
        {current.icon}
      </div>

      {/* ข้อความและปุ่มตัดสินใจ */}
      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className={`text-sm font-semibold ${current.titleColor}`}>{title}</h4>
        {message && <p className="text-xs opacity-85 mt-1 leading-relaxed">{message}</p>}

        {/* ปุ่มตัดสินใจเมื่อเป็น type="confirm" */}
        {type === "confirm" && (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              {confirmText}
            </button>
            <button
              type="button"
              onClick={onCancel || onClose}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          </div>
        )}
      </div>

      {/* ปุ่มปิดมุมขวา */}
      {onClose && type !== "confirm" && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/5 transition-all cursor-pointer"
          aria-label="ปิดการแจ้งเตือน"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import AlertModal from "@/components/ui/AlertModal";
import { AlertType } from "@/components/ui/AlertBanner";

interface AlertOptions {
  type?: Exclude<AlertType, "confirm">;
  title: string;
  message?: string;
  confirmText?: string;
  duration?: number; // ค่าเริ่มต้น 3000 ms (ใส่ 0 หากต้องการให้ค้างไว้จนกว่าจะกดเอง)
}

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => Promise<void>;
  showConfirm: (options: ConfirmOptions) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    type: AlertType;
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
    duration?: number;
  }>({
    type: "info",
    title: "",
    duration: 3000,
  });

  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const showAlert = (options: AlertOptions): Promise<void> => {
    setConfig({
      type: options.type || "info",
      title: options.title,
      message: options.message,
      confirmText: options.confirmText || "ตกลง",
      duration: options.duration !== undefined ? options.duration : 3000,
    });
    setIsOpen(true);

    return new Promise((resolve) => {
      resolverRef.current = () => resolve();
    });
  };

  const showConfirm = (options: ConfirmOptions): Promise<boolean> => {
    setConfig({
      type: "confirm",
      title: options.title,
      message: options.message,
      confirmText: options.confirmText || "ยืนยัน",
      cancelText: options.cancelText || "ยกเลิก",
      isDanger: options.isDanger || false,
      duration: 0, // โหมดตัดสินใจไม่ปิดเอง ต้องรอผู้ใช้กด
    });
    setIsOpen(true);

    return new Promise((resolve) => {
      resolverRef.current = (result: boolean) => resolve(result);
    });
  };

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    resolverRef.current?.(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    resolverRef.current?.(false);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      <AlertModal
        isOpen={isOpen}
        type={config.type}
        title={config.title}
        message={config.message}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        isDanger={config.isDanger}
        duration={config.duration}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/layout/Loading";

interface NavigationContextType {
  startNavigation: (href: string) => void;
  cancelNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isCancelledRef = useRef(false);

  // 4. เมื่อเปลี่ยนหน้าสำเร็จ (pathname เปลี่ยน) -> ปิด Modal อัตโนมัติ
  useEffect(() => {
    setIsNavigating(false);
    isCancelledRef.current = false;
  }, [pathname]);

  // 1. เริ่มเปลี่ยนหน้า -> แสดง Modal
  const startNavigation = (href: string) => {
    // ถ้ากดเมนูหน้าเดิมที่ยืนอยู่แล้ว ไม่ต้องเปิด Modal
    if (href === pathname) return;

    isCancelledRef.current = false;
    setIsNavigating(true);
    router.push(href);
  };

  // 3. คลิก Cancel หรือ X -> ปิด Modal และยกเลิกการไปต่อ
  const cancelNavigation = () => {
    isCancelledRef.current = true;
    setIsNavigating(false);
    // หยุดการโหลดหน้าใหม่ (หากเบราว์เซอร์กำลังโหลดค้างอยู่)
    if (typeof window !== "undefined") {
      window.stop();
    }
  };

  return (
    <NavigationContext.Provider value={{ startNavigation, cancelNavigation }}>
      {children}
      {/* วาง Global Loading Modal ไว้ตรงนี้เพื่อให้แสดงทับทุกหน้า */}
      <Loading isOpen={isNavigating} onCancel={cancelNavigation} />
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
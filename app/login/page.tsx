"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { useAlert } from "@/context/AlertContext";
import pkg from "@/package.json";
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showAlert } = useAlert();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      await showAlert({
        type: "warning",
        title: "ข้อมูลไม่ครบถ้วน",
        message: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน",
      });
      return;
    }

    setIsLoading(true);

    // จำลองการส่ง Request ไปตรวจสอบที่ API (หน่วงเวลา 0.8 วินาที)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // ตรวจสอบบัญชีสมมุติ (admin / 1234)
    if (username === "admin" && password === "1234") {
      // สร้าง Token สมมุติและบันทึกลง Cookie เพื่อให้ Middleware อ่านได้
      const mockToken = `mock_jwt_token_${Date.now()}`;
      const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 8; // 7 วัน หรือ 8 ชั่วโมง
document.cookie = `${pkg.name}_token=${mockToken}; path=/; max-age=${maxAge}; SameSite=Lax`;

      setIsLoading(false);

      await showAlert({
        type: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        message: "กำลังนำคุณเข้าสู่ระบบจัดการ Web-AM3",
        duration: 1500,
      });

      // เปลี่ยนไปหน้าที่ตั้งใจเข้าก่อนหน้า หรือหน้าหลัก (/)
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
      router.refresh();
    } else {
      setIsLoading(false);
      await showAlert({
        type: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง (ทดสอบใช้: admin / 1234)",
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 animate-fade-up">
      {/* โลโก้และชื่อระบบ */}
      <div className="text-center mb-8">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30 mb-4">
          {pkg.name.charAt(0)}
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          {pkg.name.toUpperCase()}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          ลงชื่อเข้าใช้งานระบบควบคุมและติดตามข้อมูล
        </p>
      </div>

      {/* ฟอร์มเข้าสู่ระบบ */}
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="ชื่อผู้ใช้งาน (Username)"
          placeholder="กรอกชื่อผู้ใช้งาน"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          required
        />

        <Input
          label="รหัสผ่าน (Password)"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          required
        />

        <div className="flex items-center justify-between pt-1">
          <Checkbox
            label="จดจำการเข้าสู่ระบบ"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2 shadow-md shadow-blue-600/20"
        >
          {isLoading ? "กำลังตรวจสอบสิทธิ์..." : "เข้าสู่ระบบ"}
        </Button>
      </form>

      {/* กล่องแนะนำบัญชีทดสอบ */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 text-center">
        <p className="text-xs text-slate-500">
          บัญชีทดสอบ: <span className="font-semibold text-slate-700">admin</span> / รหัสผ่าน:{" "}
          <span className="font-semibold text-slate-700">1234</span>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-slate-600 text-sm">กำลังโหลด...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
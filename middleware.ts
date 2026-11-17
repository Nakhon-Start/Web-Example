import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// กำหนดเส้นทางที่เป็น Public (ไม่ต้อง Login ก็เข้าได้)
const PUBLIC_ROUTES = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ข้ามไฟล์ระบบและไฟล์ Static (รูปภาพ, CSS, JS, API)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // เช่น /background.png, /favicon.ico
  ) {
    return NextResponse.next();
  }

  // 2. ดึง Token จาก Cookie
  const token = request.cookies.get("web_am3_token")?.value;

  // เช็กว่าหน้าปัจจุบันอยู่ในกลุ่ม Public หรือไม่
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 3. กรณีเข้าหน้า Private แต่ไม่มี Token -> ดีดไปหน้า /login
  if (!isPublicRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    // แนบ Path เดิมไปด้วย เผื่อ Login เสร็จจะได้เด้งกลับหน้าเดิม
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. กรณีมี Token อยู่แล้ว แต่พยายามเข้าหน้า /login -> ดีดไปหน้าหลัก (/)
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// กำหนดขอบเขตการทำงานของ Middleware (ยกเว้น static assets)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell"; // <-- แก้ Path ตรงนี้
import pkg from "@/package.json";
export const metadata: Metadata = {
  title: `${pkg.name} `,
  description: "Next.js Dashboard Layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Select from "@/components/ui/Select";
import AlertBanner from "@/components/ui/AlertBanner";
import { useAlert } from "@/context/AlertContext";



export default function ExampleUIPage() {
  const [textValue, setTextValue] = useState("");
  const [errorInput, setErrorInput] = useState("192.168.1.999");
  const [selectedMode, setSelectedMode] = useState("lan");
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const { showAlert, showConfirm } = useAlert();
const [decisionResult, setDecisionResult] =
  useState<string>("ยังไม่ได้ตัดสินใจ");

const handleDecisionTest = async (isDanger: boolean) => {
  const isConfirmed = await showConfirm({
    title: isDanger
      ? "ยืนยันการลบข้อมูลเครื่องจักร?"
      : "ยืนยันการส่งคำสั่งทำงาน?",
    message: isDanger
      ? "หากลบข้อมูลเครื่อง TRD301 แล้ว จะไม่สามารถกู้คืนประวัติย้อนหลังได้"
      : "ระบบจะส่งค่าพารามิเตอร์ใหม่ไปยังไลน์ผลิตทันที",
    confirmText: isDanger ? "ลบข้อมูล" : "ยืนยันดำเนินการ",
    cancelText: "ยกเลิก",
    isDanger,
  });

  if (isConfirmed) {
    setDecisionResult("ผู้ใช้กด: ยืนยัน (True)");
    await showAlert({
      type: "success",
      title: "ดำเนินการสำเร็จ",
      message: "ระบบบันทึกการตัดสินใจของคุณเรียบร้อยแล้ว",
    });
  } else {
    setDecisionResult("ผู้ใช้กด: ยกเลิก (False)");
  }
};

  const triggerLoadingTest = () => {
    setIsBtnLoading(true);
    setTimeout(() => setIsBtnLoading(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto ">
      {/* ส่วนหัวหน้า */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 shadow-sm ">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Example UI Components
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            หน้ารวมตัวอย่างและทดสอบการใช้งาน UI Components มาตรฐานของระบบ
            Web-AM3
          </p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 w-fit">
          UI KIT v1.0
        </span>
      </div>

      {/* 1. หมวดปุ่มกด (Buttons) */}
      <section className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5 animate-fade-up">
        <div className="border-b border-slate-200/80 pb-3">
          <h2 className="text-base font-bold text-slate-800">
            1. Buttons (ปุ่มกด)
          </h2>
          <p className="text-xs text-slate-500">
            รูปแบบปุ่ม ขนาด และสถานะกำลังโหลด
          </p>
        </div>

        {/* รูปแบบปุ่ม */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase">
            Variants
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* ขนาดปุ่ม และ ปุ่มมีไอคอน / Loading */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase">
            Sizes & States
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small (sm)</Button>
            <Button size="md">Medium (md)</Button>
            <Button size="lg">Large (lg)</Button>
            <Button
              variant="primary"
              isLoading={isBtnLoading}
              onClick={triggerLoadingTest}
              icon={
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              }
            >
              {isBtnLoading ? "กำลังบันทึก..." : "กดทดสอบ Loading"}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. หมวดกล่องกรอกข้อมูลและตัวเลือก (Inputs & Select) */}
      <section className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5 animate-fade-up">
        <div className="border-b border-slate-200/80 pb-3">
          <h2 className="text-base font-bold text-slate-800">
            2. Text Boxes & Select (ช่องกรอกข้อมูลและตัวเลือก)
          </h2>
          <p className="text-xs text-slate-500">
            รองรับ Label, Helper Text, ไอคอน และแจ้งเตือน Error
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="ชื่อผู้ใช้งาน / รหัสพนักงาน"
            placeholder="กรอกข้อมูลที่นี่..."
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            helperText="ตัวอย่างข้อความอธิบายเพิ่มเติมใต้ช่องกรอก"
            required
          />

          <Input
            label="ค้นหาอุปกรณ์ (มีไอคอนด้านซ้าย)"
            placeholder="ค้นหาชื่อเครื่อง หรือ IP..."
            leftIcon={
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />

          <Input
            label="ตัวอย่างสถานะ Error"
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            error="รูปแบบ IP Address ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง"
          />

          <Select
            label="โปรโตคอลการเชื่อมต่อ (Select)"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            options={[
              { label: "LAN Static IP (TCP/IP)", value: "lan" },
              { label: "WebSocket Streaming", value: "ws" },
              { label: "RS232 Serial Port", value: "serial" },
            ]}
          />
        </div>
      </section>

      {/* 3. หมวดตัวเลือก Checkbox */}
      <section className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5 animate-fade-up">
        <div className="border-b border-slate-200/80 pb-3">
          <h2 className="text-base font-bold text-slate-800">
            3. Checkboxes (กล่องติ๊กเลือก)
          </h2>
          <p className="text-xs text-slate-500">
            ตัวเลือกแบบติ๊กถูก พร้อมคำอธิบายย่อย
          </p>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="เปิดใช้งานการเชื่อมต่ออัตโนมัติ (Auto Reconnect)"
            description="ระบบจะพยายามเชื่อมต่อใหม่ทุก 5 วินาทีหากสัญญาณขาดหาย"
            checked={isChecked1}
            onChange={(e) => setIsChecked1(e.target.checked)}
          />

          <div className="block">
            <Checkbox
              label="บันทึก Log การทำงานลงฐานข้อมูล"
              checked={isChecked2}
              onChange={(e) => setIsChecked2(e.target.checked)}
            />
          </div>
        </div>
      </section>

      {/* 4. หมวดการแจ้งเตือนและการตัดสินใจ (Alerts & Confirmations) */}
      <section className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5 animate-fade-up">
        <div className="border-b border-slate-200/80 pb-3">
          <h2 className="text-base font-bold text-slate-800">
            4. Alerts & Decision Confirmations
          </h2>
          <p className="text-xs text-slate-500">
            การแจ้งเตือนครบ 5 สถานะ ทั้งแบบ Pop-up Modal และแถบ Banner
            ในหน้าเว็บ
          </p>
        </div>

        {/* ทดสอบ Pop-up Modal */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase">
            Global Alert & Confirm Modal (Pop-up กลางจอ)
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                showAlert({
                  type: "success",
                  title: "บันทึกข้อมูลสำเร็จ",
                  message: "อัปเดตการตั้งค่าเรียบร้อยแล้ว",
                })
              }
            >
              Alert: Success
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                showAlert({
                  type: "error",
                  title: "เชื่อมต่อล้มเหลว",
                  message: "ไม่สามารถติดต่อเซิร์ฟเวอร์ปลายทางได้ (Timeout)",
                })
              }
            >
              Alert: Error
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                showAlert({
                  type: "warning",
                  title: "คำเตือนระบบ",
                  message: "หน่วยความจำใกล้เต็ม กรุณาตรวจสอบพื้นที่จัดเก็บ",
                })
              }
            >
              Alert: Warning
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                showAlert({
                  type: "info",
                  title: "แจ้งเพื่อทราบ",
                  message: "ระบบจะปิดปรับปรุงชั่วคราวเวลา 23:00 น.",
                })
              }
            >
              Alert: Info
            </Button>

            <Button variant="primary" onClick={() => handleDecisionTest(false)}>
              Confirm (ตัดสินใจทั่วไป)
            </Button>

            <Button variant="danger" onClick={() => handleDecisionTest(true)}>
              Confirm (ลบข้อมูลสำคัญ)
            </Button>
          </div>
          <p className="text-xs text-slate-600 pt-1">
            ผลลัพธ์การตัดสินใจล่าสุด:{" "}
            <span className="font-semibold text-blue-600">
              {decisionResult}
            </span>
          </p>
        </div>

        {/* ตัวอย่าง Inline Alert Banners */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-semibold text-slate-500 uppercase">
            Inline Alert Banners (แถบแจ้งเตือนในหน้า)
          </div>
          <AlertBanner
            type="success"
            title="Success Alert"
            message="การซิงค์ข้อมูลเสร็จสมบูรณ์ 100%"
          />
          <AlertBanner
            type="error"
            title="Error Alert"
            message="พบข้อผิดพลาดในการอ่านค่าจากพอร์ตสื่อสาร"
          />
          <AlertBanner
            type="warning"
            title="Warning Alert"
            message="ความเร็วในการตอบสนองช้ากว่าปกติ"
          />
          <AlertBanner
            type="info"
            title="Info Alert"
            message="กำลังใช้งานในโหมด Local Network (192.168.1.38)"
          />
          <AlertBanner
            type="confirm"
            title="ต้องการยืนยันการเปลี่ยนแปลงนี้หรือไม่?"
            message="การกดยืนยันจะรีสตาร์ทเซอร์วิสที่เกี่ยวข้องทันที"
            onConfirm={() => alert("กดยืนยันจาก Banner!")}
            onCancel={() => alert("กดยกเลิกจาก Banner!")}
          />
        </div>
      </section>
    </div>
  );
}

# Web-Example

web/
├── middleware.ts                # ดักตรวจสอบ Cookie Token ก่อนเข้าถึงหน้าเว็บ (Public vs Private Routes)
├── package.json                 # เก็บข้อมูลโปรเจกต์ (name, version) และ Dependencies
├── tsconfig.json                # ตั้งค่า TypeScript และ Path Alias (@/*)
│
├── public/                      # ไฟล์ Static ที่เข้าถึงได้ตรงจาก Root URL
│   └── background.png           # ภาพพื้นหลังหลักของระบบ
│
├── app/                         # โฟลเดอร์กำหนดเส้นทางหน้าเว็บ (File-based Routing)
│   ├── globals.css              # สไตล์ส่วนกลาง, คลาสพื้นหลัง (.bg-custom-tech) และ Keyframe Animations
│   ├── layout.tsx               # Root Layout หลักที่ครอบทุกหน้าด้วย <AppShell>
│   ├── page.tsx                 # หน้าแรก Dashboard (/) [Private Route]
│   ├── login/
│   │   └── page.tsx             # หน้าเข้าสู่ระบบ (/login) [Public Route]
│   └── example-ui/
│       └── page.tsx             # หน้ารวมตัวอย่างและทดสอบ UI Components (/example-ui) [Private Route]
│
├── components/                  # ส่วนประกอบ UI ที่นำกลับมาใช้ซ้ำได้ (Reusable Components)
│   ├── layout/                  # ส่วนประกอบโครงสร้างหลักของหน้าเว็บ
│   │   ├── AppShell.tsx         # ตัวควบคุม Layout หลัก (ซ่อน/แสดง Sidebar, Navbar ตาม Route)
│   │   ├── Sidebar.tsx          # เมนูด้านข้างแบบ Sticky (พับ/ขยายได้ และไม่เลื่อนตาม Scroll)
│   │   ├── Navbar.tsx           # แถบเมนูด้านบน พร้อมสถานะผู้ใช้และปุ่ม Logout
│   │   ├── Footer.tsx           # แถบแสดงชื่อแอปและเวอร์ชันด้านล่าง
│   │   └── Loading.tsx          # หน้าต่าง Modal แสดงสถานะกำลังโหลดขณะเปลี่ยนหน้า
│   │
│   └── ui/                      # ส่วนประกอบย่อยระดับอะตอม (Atomic UI Components)
│       ├── Button.tsx           # ปุ่มกด (รองรับ Variants, Sizes, Icon และสถานะ isLoading)
│       ├── Input.tsx            # ช่องกรอกข้อความ (รองรับ Label, Left Icon, Helper Text และ Error)
│       ├── Checkbox.tsx         # ช่องติ๊กเลือก (รองรับคำอธิบายย่อย Description)
│       ├── Select.tsx           # ตัวเลือก Dropdown มาตรฐาน
│       ├── AlertBanner.tsx      # แถบแจ้งเตือนแบบฝังในหน้า (Inline Alert)
│       └── AlertModal.tsx       # หน้าต่าง Pop-up แจ้งเตือน & ยืนยันการตัดสินใจ (มีระบบนับถอยหลังปิดอัตโนมัติ)
│
└── context/                     # ตัวจัดการสถานะส่วนกลาง (Global State Management)
    ├── AlertContext.tsx         # ให้บริการฟังก์ชัน showAlert() และ showConfirm() แบบ Promise
    └── NavigationContext.tsx    # จัดการการเปลี่ยนหน้าพร้อมแสดง Loading Modal
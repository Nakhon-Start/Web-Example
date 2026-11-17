"use client";

interface LoadingModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function Loading({ isOpen, onCancel }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    // 1. พื้นหลัง Dim ให้มืดลง + เบลอเล็กน้อย (z-50 อยู่บนสุดเหนือ Navbar และ Sidebar)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-modal-title"
    >
      {/* 2. กล่อง Modal กึ่งกลางหน้าจอ */}
      <div className="relative w-full max-w-xs mx-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-6 text-center">
        {/* 3. ปุ่มกากบาท (X) มุมขวาบน */}
        <button
          onClick={onCancel}
          className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="ปิดหน้าต่าง"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 4. Spinner แสดงสถานะ Loading */}
        <div className="mt-2 mb-4 flex justify-center">
          <div className="relative w-12 h-12">
            {/* วงแหวนพื้นหลัง */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            {/* วงแหวนหมุนสีฟ้า-ไซอัน */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>
        </div>

        {/* 5. ข้อความแจ้งสถานะ */}
        <h3 id="loading-modal-title" className="text-base font-semibold text-slate-800">
          กำลังเปลี่ยนหน้า...
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          กรุณารอสักครู่ ระบบกำลังโหลดข้อมูล
        </p>

        {/* 6. ปุ่มยกเลิก ด้านล่าง */}
        <div className="mt-6">
          <button
            onClick={onCancel}
            className="w-full py-2 px-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
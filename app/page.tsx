export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            System Control Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            ภาพรวมสถานะระบบและการเชื่อมต่อข้อมูลแบบ Real-time
          </p>
        </div>

        {/* ป้ายสถานะระบบกระพริบเบาๆ */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 text-xs font-medium text-slate-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM ONLINE
        </div>
      </div>

      {/* การ์ดสไตล์ Tech Glass */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white/85 backdrop-blur-md rounded-xl border border-slate-200/90 hover:border-blue-400/60 shadow-sm transition-all">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Nodes
          </div>
          <div className="text-3xl font-bold text-slate-800 mt-2">1,248</div>
        </div>

        <div className="p-5 bg-white/85 backdrop-blur-md rounded-xl border border-slate-200/90 hover:border-cyan-400/60 shadow-sm transition-all">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active Streams
          </div>
          <div className="text-3xl font-bold text-blue-600 mt-2">42</div>
        </div>

        <div className="p-5 bg-white/85 backdrop-blur-md rounded-xl border border-slate-200/90 hover:border-emerald-400/60 shadow-sm transition-all">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Uptime Status
          </div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">99.9%</div>
        </div>
      </div>
    </div>
  );
}
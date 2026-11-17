import pkg from "@/package.json";
export default function Footer() {
  return (
    <footer className="bg-white/60 backdrop-blur-sm text-slate-500 text-sm py-4 px-6 border-t border-slate-200/80 text-center relative z-10">
      <span>{pkg.name.toUpperCase()} v{pkg.version}</span>
    </footer>
  );
}
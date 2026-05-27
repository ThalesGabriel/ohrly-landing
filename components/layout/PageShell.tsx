import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "./SiteFooter";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-[#020b12] dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-20%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}
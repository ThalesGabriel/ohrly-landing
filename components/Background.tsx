export default function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-0">
      <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute right-0 top-80 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[360px] w-[520px] rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
    </div>
  );
}
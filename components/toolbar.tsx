"use client";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-6">
      <div className="text-xl font-semibold text-[#ededed]">Ohrly</div>

      <button
        onClick={() =>
          document.getElementById("cta")?.scrollIntoView({
            behavior: "smooth",
          })
        }
        className="border border-green-400 px-4 py-2 rounded-lg text-green-400 transition-all duration-200 hover:bg-green-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 cursor-pointer">
        Entre em contato
      </button>
    </nav>
  );
}
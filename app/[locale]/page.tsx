import { Comparison } from "@/components/sections/comparison";
import { CTA } from "@/components/sections/cta";
import { Focus } from "@/components/sections/focus";
import { Footer } from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import { HiddenCost } from "@/components/sections/hidden-cost";
import { OperationalSection } from "@/components/sections/how-it-works";
import { OperationalLanguage } from "@/components/sections/language";
import { Navbar } from "@/components/sections/navbar";
import { ProblemSection } from "@/components/sections/problem";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero/>
      <ProblemSection/>
      <OperationalSection/>
    </main>
  );
}
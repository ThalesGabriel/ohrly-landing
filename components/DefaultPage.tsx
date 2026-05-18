import BackgroundEffects from "./Background";
import { Header } from "./Header";

type Props = {
    children: React.ReactNode;
}

export default function DefaultPage({
    children
}: Props) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <BackgroundEffects />

      <Header />

      <section className="relative mx-auto min-h-screen pt-30 flex w-full max-w-7xl flex-col gap-16 px-6 pb-20 pt-16 sm:px-8 lg:px-12">
    
        {children}
      
      </section>
    </main>
  );
}
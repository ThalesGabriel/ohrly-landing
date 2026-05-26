import Header from "@/components/Header";
import Footer from "@/components/Footer";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type OhrlyPageShellProps = {
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
};

export default function OhrlyPageShell({
    children,
    className,
    contentClassName,
}: OhrlyPageShellProps) {
    return (
        <main
            className={cn(
                "min-h-screen overflow-x-hidden text-slate-950 transition-colors dark:text-slate-100",
                "bg-slate-50 dark:bg-[#020b12]",
                className,
            )}
        >
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(8,145,178,0.10),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.08),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_55%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.10),transparent_28%),linear-gradient(180deg,#020b12_0%,#020812_55%,#020b12_100%)]" />

            <div className="pointer-events-none fixed inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(15,23,42,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.7)_1px,transparent_1px)] [background-size:44px_44px] dark:opacity-[0.06] dark:[background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]" />

            <div className={cn("relative mx-auto py-6", contentClassName)}>
                <div className="px-5 sm:px-8 lg:px-10">
                    <Header />
                </div>

                {children}

                <Footer />
            </div>
        </main>
    );
}
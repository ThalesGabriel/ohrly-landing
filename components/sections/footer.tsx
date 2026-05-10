export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816] py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 lg:flex-row lg:px-8">
        <div>
          <div className="text-2xl font-semibold">ohrly</div>
          <p className="mt-3 max-w-sm text-sm text-white/40">
            Behavioral Observability for systems that never stop changing.
          </p>
        </div>

        <div className="grid gap-8 text-sm text-white/50 md:grid-cols-4">
          <div>
            <p className="mb-3 text-white">Product</p>
            <p>Overview</p>
            <p>Features</p>
            <p>Pricing</p>
          </div>

          <div>
            <p className="mb-3 text-white">Use Cases</p>
            <p>Fintech</p>
            <p>E-commerce</p>
            <p>SaaS</p>
          </div>

          <div>
            <p className="mb-3 text-white">Resources</p>
            <p>Blog</p>
            <p>Docs</p>
            <p>Reports</p>
          </div>

          <div>
            <p className="mb-3 text-white">Company</p>
            <p>About</p>
            <p>Contact</p>
            <p>Privacy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-white">

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-xl font-bold">
            CivicFix
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Making communities better, one report at a time.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 CivicFix Build by Devesh. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
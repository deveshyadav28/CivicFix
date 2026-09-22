import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-emerald-600">
          CivicFix
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Home
          </Link>

          <a
            href="#features"
            className="text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            How it works
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

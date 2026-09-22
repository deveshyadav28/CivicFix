import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <div className="mb-6 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            Smart Civic Issue Management
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Report Issues.
            <span className="block text-emerald-600">Create Change.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            CivicFix helps citizens report local problems, track complaints and
            stay connected with their community.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Report an Issue →
            </Link>

            <a
              href="#how-it-works"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-4xl shadow-lg">
                  📍
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-800">
                  Report a Civic Issue
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Help make your community better
                </p>
              </div>

              <div className="absolute left-10 top-12 h-4 w-4 rounded-full bg-red-500 ring-4 ring-white" />

              <div className="absolute right-16 top-20 h-4 w-4 rounded-full bg-yellow-500 ring-4 ring-white" />

              <div className="absolute bottom-14 left-20 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

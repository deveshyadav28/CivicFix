import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-emerald-600 py-20">

      <div className="mx-auto max-w-4xl px-6 text-center">

        <h2 className="text-4xl font-bold text-white">
          See an issue in your area?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50">
          Report it through CivicFix and help make your
          community cleaner, safer and better.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-emerald-700 hover:bg-slate-100"
        >
          Report an Issue →
        </Link>

      </div>

    </section>
  );
}

export default CTA;
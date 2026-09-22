function Features() {
  const features = [
    {
      icon: "📍",
      title: "Location Based",
      description: "Report civic problems with their exact location.",
    },
    {
      icon: "📸",
      title: "Easy Reporting",
      description: "Upload photos and describe the issue in seconds.",
    },
    {
      icon: "🔔",
      title: "Track Updates",
      description: "Know exactly what is happening with your complaint.",
    },
    {
      icon: "⚡",
      title: "Smart Priority",
      description: "Important complaints can be prioritized automatically.",
    },
  ];

  return (
    <section id="features" className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-emerald-600">
            FEATURES
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Everything you need to report problems
          </h2>

          <p className="mt-4 text-slate-600">
            A simple platform connecting citizens with
            the people responsible for solving civic issues.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;
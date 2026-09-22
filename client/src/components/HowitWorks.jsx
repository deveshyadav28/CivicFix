function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Report",
      description: "Tell us about the civic problem and add its location.",
    },
    {
      number: "02",
      title: "Track",
      description: "Follow your complaint as it moves through the process.",
    },
    {
      number: "03",
      title: "Resolve",
      description: "Get notified when the issue has been resolved.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-slate-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold text-emerald-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Three simple steps
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;
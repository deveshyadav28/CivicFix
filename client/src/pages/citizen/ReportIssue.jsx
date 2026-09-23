import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ReportIssue() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    severity: "Low",
    affectedPeople: 1,
    address: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            category: formData.category,

            severity: formData.severity,

            affectedPeople: Number(
              formData.affectedPeople
            ),

            location: {
              address: formData.address,

              latitude: Number(
                formData.latitude
              ),

              longitude: Number(
                formData.longitude
              ),
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong"
        );
      }

      alert(
        `Complaint submitted successfully!\nPriority: ${data.priority}`
      );

      navigate("/dashboard");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-emerald-600"
          >
            CivicFix
          </Link>

          <Link
            to="/dashboard"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            ← Dashboard
          </Link>

        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-10">

        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-600">
            REPORT ISSUE
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Report a civic problem
          </h1>

          <p className="mt-2 text-slate-500">
            Provide accurate information so the issue
            can be resolved faster.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
        >

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Issue Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Broken street light"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
              required
            >
              <option value="">
                Select category
              </option>

              <option value="Road">
                Road
              </option>

              <option value="Garbage">
                Garbage
              </option>

              <option value="Streetlight">
                Streetlight
              </option>

              <option value="Water">
                Water
              </option>

              <option value="Electricity">
                Electricity
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the problem..."
              rows="5"
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Severity
              </label>

              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                People Affected
              </label>

              <input
                type="number"
                name="affectedPeople"
                min="1"
                value={formData.affectedPeople}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                required
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location / Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter issue location"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Latitude
              </label>

              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="26.8467"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Longitude
              </label>

              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="80.9462"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading
              ? "Submitting..."
              : "Submit Complaint"}
          </button>

        </form>

      </main>

    </div>
  );
}

export default ReportIssue;
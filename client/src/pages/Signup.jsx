import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signupUser(formData);

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="text-center">
          <Link
            to="/"
            className="text-3xl font-bold text-emerald-600"
          >
            CivicFix
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join CivicFix and help improve your community.
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>

        
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="devesh@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyComplaints } from "../../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getMyComplaints();

      setComplaints(data.complaints);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const total = complaints.length;

  const pending = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  // Latest 3 complaints
  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">

   
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-emerald-600"
          >
            CivicFix
          </Link>

          <div className="flex items-center gap-4">

            <span className="hidden text-sm text-slate-600 sm:block">
              👋 {user?.name}
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/";
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-10">

      
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm font-semibold text-emerald-600">
              CITIZEN DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Welcome back, {user?.name} 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Track and manage your civic complaints.
            </p>
          </div>

          <Link
            to="/report-issue"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white hover:bg-emerald-700"
          >
            + Report Issue
          </Link>

        </div>

     
        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

   
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            Loading complaints...
          </div>
        ) : (
          <>
  
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <StatCard
                title="Total Complaints"
                value={total}
                icon="📋"
              />

              <StatCard
                title="Pending"
                value={pending}
                icon="⏳"
              />

              <StatCard
                title="In Progress"
                value={inProgress}
                icon="🔄"
              />

              <StatCard
                title="Resolved"
                value={resolved}
                icon="✅"
              />

            </div>

            <div className="mt-10 rounded-2xl border bg-white p-6">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold text-slate-900">
                  Recent Complaints
                </h2>

                {complaints.length > 0 && (
                  <Link
                    to="/complaints"
                    className="text-sm font-semibold text-emerald-600 hover:underline"
                  >
                    View all →
                  </Link>
                )}

              </div>

              {recentComplaints.length === 0 ? (

                <div className="mt-8 rounded-xl border border-dashed p-10 text-center">

                  <div className="text-4xl">
                    📋
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-800">
                    No complaints yet
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Report your first civic issue to get started.
                  </p>

                  <Link
                    to="/report-issue"
                    className="mt-5 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Report Issue
                  </Link>

                </div>

              ) : (

                <div className="mt-6 space-y-4">

                  {recentComplaints.map((complaint) => (
                    <ComplaintCard
                      key={complaint._id}
                      complaint={complaint}
                    />
                  ))}

                </div>

              )}

            </div>
          </>
        )}

      </main>
    </div>
  );
}


function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border bg-white p-6">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

function ComplaintCard({ complaint }) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border p-5 transition hover:shadow-sm md:flex-row md:items-center">

      <div>

        <div className="flex flex-wrap items-center gap-3">

          <h3 className="font-bold text-slate-900">
            {complaint.title}
          </h3>

          <StatusBadge status={complaint.status} />

        </div>

        <p className="mt-2 text-sm text-slate-500">
          {complaint.category} •{" "}
          {complaint.location?.address}
        </p>

        <p className="mt-2 line-clamp-1 text-sm text-slate-600">
          {complaint.description}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <PriorityBadge
          priority={complaint.priority}
        />

      </div>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Assigned: "bg-blue-100 text-blue-700",
    "In Progress": "bg-orange-100 text-orange-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}




function PriorityBadge({ priority }) {
  const styles = {
    Low: "bg-green-50 text-green-700",
    Medium: "bg-yellow-50 text-yellow-700",
    High: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[priority] || "bg-slate-100 text-slate-600"
      }`}
    >
      {priority} Priority
    </span>
  );
}

export default Dashboard;
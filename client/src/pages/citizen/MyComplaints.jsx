import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyComplaints } from "../../services/api";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await getMyComplaints();

      setComplaints(data.complaints);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
    
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/dashboard" className="text-2xl font-bold text-emerald-600">
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

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">My Complaints</h1>

        <p className="mt-2 text-slate-500">
          Track all the issues you have reported.
        </p>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading...</div>
        ) : complaints.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed bg-white p-12 text-center">
            <div className="text-4xl">📋</div>

            <h2 className="mt-4 font-bold">No complaints found</h2>

            <Link
              to="/report-issue"
              className="mt-5 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Report Issue
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="rounded-2xl border bg-white p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {complaint.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {complaint.category}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {complaint.location?.address}
                    </p>

                    <Link
                      to={`/complaints/${complaint._id}`}
                      className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>

                  <div className="flex gap-2">
                    <span className="h-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      {complaint.status}
                    </span>

                    <span className="h-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                      {complaint.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyComplaints;

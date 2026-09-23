import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch complaints"
        );
      }

      setComplaints(data.complaints);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const assigned = complaints.filter(
    (c) => c.status === "Assigned"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">

 
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            to="/admin"
            className="text-2xl font-bold text-emerald-600"
          >
            CivicFix
          </Link>

          <div className="flex items-center gap-4">

            <span className="hidden text-sm font-medium text-slate-600 sm:block">
              🛡️ Admin
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

  
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            ADMIN PANEL
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Complaint Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and resolve civic complaints.
          </p>
        </div>


       
        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}


      
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          <StatCard
            title="Total"
            value={total}
            icon="📋"
          />

          <StatCard
            title="Pending"
            value={pending}
            icon="⏳"
          />

          <StatCard
            title="Assigned"
            value={assigned}
            icon="👤"
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


        {/* Complaints */}
        <div className="mt-10 rounded-2xl border bg-white">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold text-slate-900">
              All Complaints
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage reported issues.
            </p>

          </div>


          {loading ? (

            <div className="p-10 text-center text-slate-500">
              Loading complaints...
            </div>

          ) : complaints.length === 0 ? (

            <div className="p-10 text-center text-slate-500">
              No complaints found.
            </div>

          ) : (

            <div className="divide-y">

              {complaints.map((complaint) => (

                <ComplaintRow
                  key={complaint._id}
                  complaint={complaint}
                  refresh={fetchComplaints}
                />

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}




function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border bg-white p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
          {icon}
        </div>

      </div>

    </div>
  );
}




function ComplaintRow({ complaint, refresh }) {
  const [status, setStatus] = useState(
    complaint.status
  );

  const [assignedTo, setAssignedTo] = useState(
    complaint.assignedTo || ""
  );

  const [updating, setUpdating] = useState(false);

  const updateStatus = async () => {
    try {
      setUpdating(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/complaints/${complaint._id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      await refresh();

    } catch (error) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };


  const assignComplaint = async () => {
    if (!assignedTo) {
      alert("Please select a department");
      return;
    }

    try {
      setUpdating(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/complaints/${complaint._id}/assign`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            assignedTo,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to assign complaint"
        );
      }

      await refresh();

    } catch (error) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };


  return (
    <div className="p-6">

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

    
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="font-bold text-slate-900">
              {complaint.title}
            </h3>

            <PriorityBadge
              priority={complaint.priority}
            />

          </div>

          <p className="mt-2 text-sm text-slate-500">
            {complaint.category} •{" "}
            {complaint.location?.address}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Reported by:{" "}
            {complaint.user?.name || "Unknown user"}
          </p>

        </div>


     
        <div className="flex flex-col gap-3 sm:flex-row">

        
          <select
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            <option value="">
              Assign department
            </option>

            <option value="Municipal Corporation">
              Municipal Corporation
            </option>

            <option value="Road Department">
              Road Department
            </option>

            <option value="Water Department">
              Water Department
            </option>

            <option value="Electricity Department">
              Electricity Department
            </option>

            <option value="Sanitation Department">
              Sanitation Department
            </option>
          </select>

          <button
            onClick={assignComplaint}
            disabled={updating}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            Assign
          </button>


    
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Assigned">
              Assigned
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>
          </select>

          <button
            onClick={updateStatus}
            disabled={updating}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Update
          </button>

        </div>

      </div>

    </div>
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

export default AdminDashboard;
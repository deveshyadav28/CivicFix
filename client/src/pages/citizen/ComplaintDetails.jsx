import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getComplaintById,
} from "../../services/api";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadComplaint();
  }, [id]);

  const loadComplaint = async () => {
    try {
      const data = await getComplaintById(id);

      setComplaint(data.complaint);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading complaint...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-emerald-600"
          >
            CivicFix
          </Link>

          <Link
            to="/complaints"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            ← My Complaints
          </Link>

        </div>
      </nav>


      <main className="mx-auto max-w-5xl px-6 py-10">


        <div>
          <p className="text-sm font-semibold text-emerald-600">
            COMPLAINT DETAILS
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {complaint.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Complaint ID: {complaint._id}
          </p>
        </div>


        <div className="mt-8 grid gap-6 lg:grid-cols-3">

    
          <div className="space-y-6 lg:col-span-2">

      
            <div className="rounded-2xl border bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Description
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {complaint.description}
              </p>

            </div>



            <div className="rounded-2xl border bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Location
              </h2>

              <p className="mt-3 text-slate-600">
                📍 {complaint.location?.address}
              </p>

              {complaint.location?.latitude && (
                <p className="mt-2 text-sm text-slate-400">
                  {complaint.location.latitude},{" "}
                  {complaint.location.longitude}
                </p>
              )}

            </div>


 
            <StatusTimeline
              status={complaint.status}
            />

          </div>


     
          <div className="space-y-6">

        
            <div className="rounded-2xl border bg-white p-6">

              <p className="text-sm text-slate-500">
                Current Status
              </p>

              <StatusBadge
                status={complaint.status}
              />

            </div>


 
            <div className="rounded-2xl border bg-white p-6">

              <p className="text-sm text-slate-500">
                Priority
              </p>

              <div className="mt-2">
                <PriorityBadge
                  priority={complaint.priority}
                />
              </div>

            </div>


            <div className="rounded-2xl border bg-white p-6">

              <p className="text-sm text-slate-500">
                Category
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {complaint.category}
              </p>

            </div>


           
            <div className="rounded-2xl border bg-white p-6">

              <p className="text-sm text-slate-500">
                Assigned To
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {complaint.assignedTo || "Not assigned yet"}
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}




function StatusTimeline({ status }) {

  const steps = [
    "Pending",
    "Assigned",
    "In Progress",
    "Resolved",
  ];

  const currentIndex = steps.indexOf(status);

  return (
    <div className="rounded-2xl border bg-white p-6">

      <h2 className="text-lg font-bold text-slate-900">
        Complaint Progress
      </h2>

      <div className="mt-8">

        {steps.map((step, index) => {

          const completed =
            index <= currentIndex;

          return (
            <div
              key={step}
              className="flex"
            >

             
              <div className="flex flex-col items-center">

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    completed
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`h-12 w-0.5 ${
                      index < currentIndex
                        ? "bg-emerald-600"
                        : "bg-slate-200"
                    }`}
                  />
                )}

              </div>


      
              <div className="ml-4 pb-8">

                <p
                  className={`font-semibold ${
                    completed
                      ? "text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {getStatusDescription(step)}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}


function getStatusDescription(status) {

  const descriptions = {
    Pending: "Complaint has been received.",
    Assigned: "Complaint has been assigned.",
    "In Progress":
      "The issue is currently being worked on.",
    Resolved:
      "The complaint has been successfully resolved.",
  };

  return descriptions[status];
}




function StatusBadge({ status }) {

  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Assigned:
      "bg-blue-100 text-blue-700",

    "In Progress":
      "bg-orange-100 text-orange-700",

    Resolved:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}




function PriorityBadge({ priority }) {

  const styles = {
    Low:
      "bg-green-50 text-green-700",

    Medium:
      "bg-yellow-50 text-yellow-700",

    High:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        styles[priority]
      }`}
    >
      {priority} Priority
    </span>
  );
}

export default ComplaintDetails;
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // Login nahi hai
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role match nahi karta
  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/dashboard"}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
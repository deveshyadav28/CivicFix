import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/citizen/Dashboard";
import ReportIssue from "./pages/citizen/ReportIssue";
import MyComplaints from "./pages/citizen/MyComplaints";
import ComplaintDetails from "./pages/citizen/ComplaintDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="citizen">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report-issue"
          element={
            <ProtectedRoute role="citizen">
              <ReportIssue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute role="citizen">
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints/:id"
          element={
            <ProtectedRoute role="citizen">
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
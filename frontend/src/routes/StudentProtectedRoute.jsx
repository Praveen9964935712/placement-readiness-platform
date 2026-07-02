import { Navigate } from "react-router-dom";

function StudentProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return token && role === "student"
    ? children
    : <Navigate to="/student-login" replace />;
}

export default StudentProtectedRoute;

import { Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Companies from "./pages/Companies";
import AddCompany from "./pages/AddCompany";
import EditCompany from "./pages/EditCompany";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentProtectedRoute from "./routes/StudentProtectedRoute";



function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/student-login" element={<StudentLogin />} />
      <Route
        path="/student/dashboard"
        element={
          <StudentProtectedRoute>
            <StudentDashboard />
          </StudentProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <StudentProtectedRoute>
            <StudentProfile />
          </StudentProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-student"
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-student/:id"
        element={
          <ProtectedRoute>
            <EditStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-company"
        element={
          <ProtectedRoute>
            <AddCompany />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-company/:id"
        element={
          <ProtectedRoute>
            <EditCompany />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
}

export default App;
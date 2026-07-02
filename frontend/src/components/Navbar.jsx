import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBell,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith("/edit-student")) return "Edit Student";
    if (location.pathname.startsWith("/edit-company")) return "Edit Company";
    if (location.pathname === "/add-student") return "Add Student";
    if (location.pathname === "/add-company") return "Add Company";
    if (location.pathname === "/students") return "Students";
    if (location.pathname === "/companies") return "Companies";
    if (location.pathname === "/dashboard") return "Dashboard";
    return "Placement Portal";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white/95 ring-1 ring-slate-200/80 shadow-sm px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Welcome back</p>
        <h2 className="text-2xl font-semibold text-slate-900">{getTitle()}</h2>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">
          <FaUserCircle className="h-4 w-4" />
          Placement Officer
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <FaBell className="h-4 w-4" />
          Notifications
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
        >
          <FaSignOutAlt className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
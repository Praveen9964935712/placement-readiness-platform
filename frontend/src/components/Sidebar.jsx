import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaUserGraduate,
  FaPlusCircle,
  FaBuilding,
  FaGraduationCap
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const activeClass =
    "flex items-center gap-3 rounded-3xl bg-cyan-500/15 px-4 py-3 text-cyan-100 ring-1 ring-cyan-500/10 transition";

  const normalClass =
    "flex items-center gap-3 rounded-3xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white";

  const isDashboard = location.pathname === "/dashboard";
  const isStudents = location.pathname.startsWith("/students") || location.pathname.startsWith("/edit-student") || location.pathname === "/add-student";
  const isCompanies = location.pathname.startsWith("/companies") || location.pathname.startsWith("/edit-company") || location.pathname === "/add-company";

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-slate-100">
      <div className="px-6 py-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="rounded-3xl bg-cyan-500/15 p-3 text-cyan-300">
            <FaGraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Placement Portal</h1>
            <p className="text-sm text-slate-400 mt-1">Campus hiring operations</p>
          </div>
        </div>
      </div>
      <nav className="px-6 py-8 space-y-3">
        <Link to="/dashboard" className={isDashboard ? activeClass : normalClass}>
          <FaChartPie />
          Dashboard
        </Link>
        <Link to="/students" className={isStudents ? activeClass : normalClass}>
          <FaUserGraduate />
          Students
        </Link>
        <Link to="/add-student" className={location.pathname === "/add-student" ? activeClass : normalClass}>
          <FaPlusCircle />
          Add Student
        </Link>
        <Link to="/companies" className={isCompanies ? activeClass : normalClass}>
          <FaBuilding />
          Companies
        </Link>
        <Link to="/add-company" className={location.pathname === "/add-company" ? activeClass : normalClass}>
          <FaPlusCircle />
          Add Company
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;

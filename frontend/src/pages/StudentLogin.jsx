import { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      if (user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-[2rem] bg-slate-900/95 p-10 shadow-2xl shadow-black/40 ring-1 ring-slate-800">
        <div className="space-y-8">
          <div className="text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/20">
              <FaUserGraduate className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold text-white">Student Portal Login</h1>
            <p className="mt-3 text-sm text-slate-400">Sign in to view your readiness score, recommendations, and eligible companies.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="student@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="••••••••"
              />
            </label>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button className="w-full rounded-3xl bg-cyan-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
              Login
            </button>
          </form>

          <div className="rounded-3xl bg-slate-950/70 p-5 text-sm text-slate-400 ring-1 ring-slate-800">
            <p>Example student credentials can be created by your placement officer or seeded in the backend.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;

import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [debugMessage, setDebugMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setDebugMessage("Attempting login...");

    try {
      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );
      console.log(response.data);
      setDebugMessage(`Success: ${response.data.message}`);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("userId", response.data.user.id);
      if (response.data.user.studentId) {
        localStorage.setItem("studentId", response.data.user.studentId);
      }

      if (response.data.user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      const detail = error.response
        ? `${error.response.status} ${error.response.data?.message || JSON.stringify(error.response.data)}`
        : error.message;
      console.error(detail);
      setDebugMessage(`Login failed: ${detail}`);
      const msg = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Login Failed";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-800">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-between bg-slate-900 p-10 lg:p-14">
            <div>
              <div className="inline-flex items-center gap-3 rounded-3xl bg-cyan-500/10 px-4 py-3 text-cyan-300 ring-1 ring-cyan-500/20">
                <FaGraduationCap className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.35em]">Placement Portal</span>
              </div>

              <h1 className="mt-8 text-4xl font-semibold text-white sm:text-5xl">Welcome back to campus hiring.</h1>
              <p className="mt-5 max-w-lg text-slate-400 leading-7">
                Log in to manage students, companies, placements, and campus drives from one polished dashboard. Your data is secure, responsive, and built for fast placement workflows.
              </p>
            </div>

            <div className="mt-10 rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10 shadow-inner shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Quick access</p>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-800/80 p-4">
                  <p className="font-medium text-white">Student login</p>
                  <p>Email: <span className="text-cyan-300">student@gmail.com</span></p>
                  <p>Password: <span className="text-cyan-300">password123</span></p>
                </div>
                <div className="rounded-2xl bg-slate-800/80 p-4">
                  <p className="font-medium text-white">Placement officer</p>
                  <p>Email: <span className="text-cyan-300">officer@gmail.com</span></p>
                  <p>Password: <span className="text-cyan-300">password123</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-10 sm:p-12">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/80">Sign in</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Access your placement dashboard</h2>
              <p className="mt-3 text-slate-400">Enter your email and password to continue. If you do not have an account, contact your placement officer.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Email address</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-3xl bg-cyan-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                Login
              </button>
            </form>

            {debugMessage && (
              <div className="mt-6 rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 ring-1 ring-white/10">
                <span className={debugMessage.startsWith("Success") ? "text-emerald-300" : "text-rose-300"}>
                  {debugMessage}
                </span>
              </div>
            )}

            <div className="mt-8 border-t border-slate-800 pt-5 text-sm text-slate-500">
              <p className="text-slate-400">Need help?</p>
              <p>Ask your placement officer to register an account or reset your password.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
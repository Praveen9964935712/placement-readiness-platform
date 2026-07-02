import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import { useEffect, useState } from "react";
import API from "../services/api";
import PageLayout from "../components/PageLayout";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await API.get("/students/analytics");
      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!analytics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
        <div className="rounded-[2rem] bg-white p-12 shadow ring-1 ring-slate-200/50 text-center">
          <p className="text-xl font-semibold text-slate-900">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const pieData = [
    {
      name: "Placed",
      value: analytics.placedStudents || 0
    },
    {
      name: "Not Placed",
      value: analytics.unplacedStudents || 0
    }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Analytics overview</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Placement Analytics</h1>
              <p className="mt-2 text-slate-600">Your latest placement metrics and student performance snapshot.</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Students</p>
              <p className="mt-5 text-4xl font-semibold text-slate-950">{analytics.totalStudents}</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Placed Students</p>
              <p className="mt-5 text-4xl font-semibold text-emerald-600">{analytics.placedStudents}</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Placement %</p>
              <p className="mt-5 text-4xl font-semibold text-sky-600">
                {analytics.placementPercentage !== undefined && analytics.placementPercentage !== null
                  ? Number(analytics.placementPercentage).toFixed(2)
                  : "0.00"}%
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Average CGPA</p>
              <p className="mt-5 text-4xl font-semibold text-violet-600">
                {analytics.averageCgpa !== undefined && analytics.averageCgpa !== null
                  ? Number(analytics.averageCgpa).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Placement Status</h2>
                <p className="mt-1 text-sm text-slate-500">Student placement distribution across drives.</p>
              </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={110} paddingAngle={4}>
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Students"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Placed Students by Branch</h2>
                <p className="mt-1 text-sm text-slate-500">Shows how many placed students belong to each branch. If a branch has no placed students, it will display zero.</p>
              </div>
            </div>
            <div className="h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.branchStats || []} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="_id" tickLine={false} axisLine={false} tick={{ fill: "#64748b" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b" }} allowDecimals={false} />
                  <Tooltip formatter={(value) => [value, "Placed Students"]} />
                  <Bar dataKey="totalStudents" fill="#0ea5e9" radius={[12, 12, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default Dashboard;

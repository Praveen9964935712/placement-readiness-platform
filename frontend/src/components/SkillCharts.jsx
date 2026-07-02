import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function SkillCharts({ student }) {
  const skillData = [
    { name: "Java", value: student.javaScore || 0 },
    { name: "DSA", value: student.dsaScore || 0 },
    { name: "Aptitude", value: student.aptitudeScore || 0 },
    { name: "Communication", value: student.communicationScore || 0 }
  ];

  const barData = skillData.map((item) => ({
    skill: item.name,
    score: item.value
  }));

  const COLORS = ["#0ea5e9", "#14b8a6", "#f97316", "#a855f7"];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Skill Breakdown</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Skill distribution</h2>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={skillData} dataKey="value" nameKey="name" outerRadius={110} fill="#0ea5e9" label>
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Skill Comparison</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Score comparison</h2>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="skill" tickLine={false} axisLine={false} tick={{ fill: "#475569" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#475569" }} domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
              <Legend />
              <Bar dataKey="score" fill="#0ea5e9" radius={[12, 12, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SkillCharts;

function RecommendationPanel({ recommendations }) {
  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Recommended Actions</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">Next steps for stronger placement readiness</h2>
      </div>

      <ul className="space-y-4">
        {recommendations.map((item, idx) => (
          <li key={idx} className="rounded-3xl bg-slate-50 p-5 text-slate-700 ring-1 ring-slate-200/80">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600">✓</span>
            <span className="ml-3">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationPanel;

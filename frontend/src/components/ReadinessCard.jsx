function ReadinessCard({ score }) {
  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Readiness Score</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-900">{score}%</h2>
        </div>
        <div className="rounded-3xl bg-cyan-500/10 px-4 py-3 text-cyan-600">Strong fit</div>
      </div>

      <div className="mt-8 text-sm text-slate-500">
        <p className="mb-2">Your placement readiness score shows your current market readiness and identifies priority growth areas.</p>
        <div className="rounded-3xl bg-slate-100 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Score details</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600">CGPA weighting</span>
              <span className="font-semibold text-slate-900">25%</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600">DSA &amp; Java impact</span>
              <span className="font-semibold text-slate-900">45%</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600">Project contribution</span>
              <span className="font-semibold text-slate-900">5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-3xl bg-slate-950/95 p-5 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Progress</p>
          <p className="mt-3 text-2xl font-semibold">{score}%</p>
          <div className="mt-6">
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-cyan-500" style={{ width: `${score}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadinessCard;

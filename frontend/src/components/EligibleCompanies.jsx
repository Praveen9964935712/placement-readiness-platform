function EligibleCompanies({ eligibleCompanies, notEligibleCompanies }) {
  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Eligible companies</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Companies fit for your current profile</h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200/80">
            <p className="text-sm font-semibold text-slate-600">Eligible Companies</p>
            <ul className="mt-4 space-y-3">
              {eligibleCompanies.length > 0 ? (
                eligibleCompanies.map((company) => (
                  <li key={company.company} className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-sm">
                    <span className="h-9 w-9 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">✓</span>
                    <div>
                      <p className="font-semibold text-slate-900">{company.company}</p>
                      <p className="text-sm text-slate-500">{company.role} • ₹{company.package} LPA</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="rounded-3xl bg-white p-4 text-slate-600">No eligible companies found yet.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200/80">
            <p className="text-sm font-semibold text-slate-600">Not Eligible Companies</p>
            <ul className="mt-4 space-y-3">
              {notEligibleCompanies.length > 0 ? (
                notEligibleCompanies.map((item) => (
                  <li key={item.company} className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="font-semibold text-slate-900">{item.company}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.reason}</p>
                  </li>
                ))
              ) : (
                <li className="rounded-3xl bg-white p-4 text-slate-600">No rejection reasons found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EligibleCompanies;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import PageLayout from "../components/PageLayout";

function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await API.get("/companies");
      setCompanies(response.data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this company?")) return;

    try {
      await API.delete(`/companies/${id}`);
      alert("Company deleted successfully.");
      fetchCompanies();
    } catch (error) {
      console.error(error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/50">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Company placements</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Companies</h1>
              <p className="mt-2 text-slate-600">Manage company drives, roles, and eligibility criteria.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/add-company")}
              className="inline-flex items-center justify-center rounded-3xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-500"
            >
              Add Company
            </button>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-slate-50 p-2">
            <div className="overflow-x-auto rounded-[1.75rem] bg-white shadow-sm ring-1 ring-slate-200/50">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Company</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Role</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Package</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Eligible CGPA</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        No companies available yet. Add a company to get started.
                      </td>
                    </tr>
                  ) : (
                    companies.map((company) => (
                      <tr key={company._id} className="hover:bg-slate-50">
                        <td className="px-6 py-5 text-slate-900">{company.companyName}</td>
                        <td className="px-6 py-5 text-slate-700">{company.role}</td>
                        <td className="px-6 py-5 text-slate-700">{company.package}</td>
                        <td className="px-6 py-5 text-slate-700">{company.eligibleCgpa}</td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => navigate(`/edit-company/${company._id}`)}
                              className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-400"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(company._id)}
                              className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-400"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default Companies;

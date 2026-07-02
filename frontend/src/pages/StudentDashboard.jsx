import { useEffect, useState } from "react";
import studentApi from "../services/studentApi";
import PageLayout from "../components/PageLayout";
import ReadinessCard from "../components/ReadinessCard";
import RecommendationPanel from "../components/RecommendationPanel";
import EligibleCompanies from "../components/EligibleCompanies";
import SkillCharts from "../components/SkillCharts";

function StudentDashboard() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("studentId") || localStorage.getItem("userId");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const result = await studentApi.getStudentInsights(studentId);
        setInsights(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchInsights();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 py-20">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">Loading dashboard...</div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 py-20">
        <div className="rounded-[2rem] bg-white p-10 shadow-lg ring-1 ring-slate-200">Unable to load student insights.</div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Student dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Placement Readiness Overview</h1>
              <p className="mt-2 text-slate-600">Personalized readiness score, recommended actions, and company eligibility based on your profile.</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <ReadinessCard score={insights.readinessScore} />

            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Profile details</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Quick metrics</h2>

              <div className="mt-8 space-y-4">
                {[
                  { label: "CGPA", value: insights.student.cgpa },
                  { label: "Projects", value: insights.student.projectCount },
                  { label: "Internships", value: insights.student.internshipCount }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-600">{item.label}</p>
                    <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Assessment scores</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Core strengths</h2>
              <div className="mt-8 space-y-4">
                {[
                  { label: "Java", value: insights.student.javaScore },
                  { label: "DSA", value: insights.student.dsaScore },
                  { label: "Aptitude", value: insights.student.aptitudeScore },
                  { label: "Communication", value: insights.student.communicationScore }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-slate-700">{item.label}</p>
                      <p className="text-slate-900 font-semibold">{item.value}%</p>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-cyan-500" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SkillCharts student={insights.student} />

        <div className="grid gap-6 lg:grid-cols-2">
          <RecommendationPanel recommendations={insights.recommendations} />
          <EligibleCompanies eligibleCompanies={insights.eligibleCompanies} notEligibleCompanies={insights.notEligibleCompanies} />
        </div>
      </div>
    </PageLayout>
  );
}

export default StudentDashboard;

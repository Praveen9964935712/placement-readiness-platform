import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import studentApi from "../services/studentApi";
import PageLayout from "../components/PageLayout";

function StudentProfile() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    branch: "",
    cgpa: "",
    javaScore: "",
    dsaScore: "",
    aptitudeScore: "",
    communicationScore: "",
    projectCount: "",
    internshipCount: ""
  });
  const [message, setMessage] = useState("");

  const studentId = localStorage.getItem("studentId") || localStorage.getItem("userId");

  useEffect(() => {
    if (!studentId) {
      navigate("/student-login");
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await studentApi.getStudentProfile(studentId);
        setStudent(profile);
        setFormValues({
          name: profile.name || "",
          branch: profile.branch || "",
          cgpa: profile.cgpa || "",
          javaScore: profile.javaScore || "",
          dsaScore: profile.dsaScore || "",
          aptitudeScore: profile.aptitudeScore || "",
          communicationScore: profile.communicationScore || "",
          projectCount: profile.projectCount || "",
          internshipCount: profile.internshipCount || ""
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, [studentId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentApi.updateStudentProfile(studentId, {
        name: formValues.name,
        branch: formValues.branch,
        cgpa: Number(formValues.cgpa),
        javaScore: Number(formValues.javaScore),
        dsaScore: Number(formValues.dsaScore),
        aptitudeScore: Number(formValues.aptitudeScore),
        communicationScore: Number(formValues.communicationScore),
        projectCount: Number(formValues.projectCount),
        internshipCount: Number(formValues.internshipCount)
      });
      setMessage("Profile saved successfully.");
    } catch (error) {
      setMessage("Unable to save profile. Please try again.");
      console.error(error);
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Profile Completion</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Student Profile</h1>
            <p className="mt-2 text-slate-600">Complete your academic and assessment details to get accurate recommendations.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Branch", name: "branch", type: "text" },
              { label: "CGPA", name: "cgpa", type: "number", step: "0.01", min: 0, max: 10 },
              { label: "Java Score", name: "javaScore", type: "number", min: 0, max: 100 },
              { label: "DSA Score", name: "dsaScore", type: "number", min: 0, max: 100 },
              { label: "Aptitude Score", name: "aptitudeScore", type: "number", min: 0, max: 100 },
              { label: "Communication Score", name: "communicationScore", type: "number", min: 0, max: 100 },
              { label: "Project Count", name: "projectCount", type: "number", min: 0 },
              { label: "Internship Count", name: "internshipCount", type: "number", min: 0 }
            ].map((field) => (
              <label key={field.name} className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">{field.label}</span>
                <input
                  name={field.name}
                  type={field.type}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                  value={formValues[field.name]}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
            ))}

            <div className="sm:col-span-2">
              <button className="rounded-3xl bg-cyan-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
                Save Profile
              </button>
            </div>
          </form>

          {message && <p className="mt-5 text-sm text-slate-600">{message}</p>}
        </section>
      </div>
    </PageLayout>
  );
}

export default StudentProfile;

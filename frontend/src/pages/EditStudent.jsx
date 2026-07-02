import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import PageLayout from "../components/PageLayout";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    phone: ""
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await API.get(`/students/${id}`);
      setFormData(response.data.student);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/students/${id}`, formData);
      alert("Student updated successfully.");
      navigate("/students");
    } catch (error) {
      console.error(error);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.6)] ring-1 ring-slate-200/50">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Edit student</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Edit Student</h1>
            <p className="mt-2 text-slate-600">Update student details for placement records.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/students")}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-200"
          >
            Back to Students
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Branch</span>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">CGPA</span>
              <input
                type="number"
                step="0.01"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Phone</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-cyan-500"
          >
            Update Student
          </button>
        </form>
      </div>
    </PageLayout>
  );
}

export default EditStudent;

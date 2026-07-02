import API from "../services/api";
import { useNavigate } from "react-router-dom";

function StudentTable({ students }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await API.delete(`/students/${id}`);
      alert("Student deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">

        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Branch</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">CGPA</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500">
                No students available. Use Add Student to create a new profile.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id} className="hover:bg-slate-50">

                <td className="px-6 py-4 text-slate-900">{student.name}</td>
                <td className="px-6 py-4 text-slate-600">{student.email}</td>
                <td className="px-6 py-4 text-slate-600">{student.branch}</td>
                <td className="px-6 py-4 text-slate-600">{student.cgpa}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/edit-student/${student._id}`)}
                      className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(student._id)}
                      className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
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

  );
}

export default StudentTable;
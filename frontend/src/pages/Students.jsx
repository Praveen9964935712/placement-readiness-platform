import { useEffect, useState } from "react";
import API from "../services/api";
import PageLayout from "../components/PageLayout";
import StudentTable from "../components/StudentTable";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/students");
      setStudents(response.data.students);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/50">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-500">Student profiles</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Students</h1>
              <p className="mt-2 text-slate-600">Review and manage student placement records.</p>
            </div>
          </div>

          <StudentTable students={students} />
        </section>
      </div>
    </PageLayout>
  );
}

export default Students;

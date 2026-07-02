import API from "./api";

const getStudentProfile = async (studentId) => {
  const response = await API.get(`/students/${studentId}`);
  return response.data.student;
};

const updateStudentProfile = async (studentId, payload) => {
  const response = await API.put(`/students/${studentId}`, payload);
  return response.data.student;
};

const getStudentInsights = async (studentId) => {
  const response = await API.get(`/students/${studentId}/insights`);
  return response.data;
};

const getEligibleCompanies = async (studentId) => {
  const response = await API.get(`/students/${studentId}/eligible-companies`);
  return response.data;
};

export default {
  getStudentProfile,
  updateStudentProfile,
  getStudentInsights,
  getEligibleCompanies
};

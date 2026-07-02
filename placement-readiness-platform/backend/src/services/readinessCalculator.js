const normalizeCgpa = (cgpa) => {
  const parsedCgpa = Number(cgpa) || 0;
  return Math.max(0, Math.min(parsedCgpa, 10)) / 10;
};

const calculateProjectScore = (projectCount) => {
  const validCount = Math.max(0, Number(projectCount) || 0);
  return Math.min(validCount, 10) * 10;
};

const calculateReadinessScore = (student) => {
  const cgpaNormalized = normalizeCgpa(student.cgpa);
  const javaScore = Number(student.javaScore) || 0;
  const dsaScore = Number(student.dsaScore) || 0;
  const aptitudeScore = Number(student.aptitudeScore) || 0;
  const communicationScore = Number(student.communicationScore) || 0;
  const projectScore = calculateProjectScore(student.projectCount);

  const readiness =
    cgpaNormalized * 25 +
    javaScore * 0.2 +
    dsaScore * 0.25 +
    aptitudeScore * 0.15 +
    communicationScore * 0.1 +
    projectScore * 0.05;

  return Number(Math.min(Math.max(readiness, 0), 100).toFixed(1));
};

module.exports = {
  calculateReadinessScore
};

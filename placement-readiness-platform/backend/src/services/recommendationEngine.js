const generateRecommendations = (student) => {
  const recommendations = [];

  if ((Number(student.javaScore) || 0) < 60) {
    recommendations.push("Focus on Java fundamentals, OOP, Collections and JDBC.");
  }

  if ((Number(student.dsaScore) || 0) < 60) {
    recommendations.push("Practice Data Structures and Algorithms.");
  }

  if ((Number(student.aptitudeScore) || 0) < 60) {
    recommendations.push("Improve Quantitative Aptitude and Logical Reasoning.");
  }

  if ((Number(student.communicationScore) || 0) < 60) {
    recommendations.push("Improve Communication and Interview Skills.");
  }

  if ((Number(student.cgpa) || 0) < 7) {
    recommendations.push("Improve academic performance.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Keep developing your strengths and maintain consistent preparation.");
  }

  return recommendations;
};

module.exports = {
  generateRecommendations
};

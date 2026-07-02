const matchCompanies = (student, companies) => {
  const eligibleCompanies = [];
  const notEligibleCompanies = [];

  companies.forEach((company) => {
    const rejectionReasons = [];
    const studentCgpa = Number(student.cgpa) || 0;
    const javaScore = Number(student.javaScore) || 0;
    const dsaScore = Number(student.dsaScore) || 0;

    if (studentCgpa < Number(company.eligibleCgpa || 0)) {
      rejectionReasons.push("CGPA below requirement");
    }

    if (javaScore < Number(company.requiredJavaScore || 0)) {
      rejectionReasons.push("Java score below requirement");
    }

    if (dsaScore < Number(company.requiredDsaScore || 0)) {
      rejectionReasons.push("DSA score below requirement");
    }

    if (rejectionReasons.length > 0) {
      notEligibleCompanies.push({
        company: company.companyName,
        reason: rejectionReasons.join(", ")
      });
    } else {
      eligibleCompanies.push({
        company: company.companyName,
        role: company.role,
        package: company.package || 0
      });
    }
  });

  return {
    eligibleCompanies,
    notEligibleCompanies
  };
};

module.exports = {
  matchCompanies
};

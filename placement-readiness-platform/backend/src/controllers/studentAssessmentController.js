const Student = require("../models/Student");
const Company = require("../models/company");
const { calculateReadinessScore } = require("../services/readinessCalculator");
const { generateRecommendations } = require("../services/recommendationEngine");
const { matchCompanies } = require("../services/companyMatcher");

const ensureStudentOwnership = (req, studentId) => {
  if (req.user.role === "student") {
    const authStudentId = req.user.studentId || req.user.id;
    if (String(authStudentId) !== String(studentId)) {
      const error = new Error("Access denied. Student may only access their own record.");
      error.statusCode = 403;
      throw error;
    }
  }
};

exports.getStudentReadiness = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    ensureStudentOwnership(req, req.params.id);

    const readinessScore = calculateReadinessScore(student);

    res.status(200).json({
      success: true,
      readinessScore
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentRecommendations = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    ensureStudentOwnership(req, req.params.id);

    const recommendations = generateRecommendations(student);

    res.status(200).json({
      success: true,
      recommendations
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getEligibleCompanies = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    ensureStudentOwnership(req, req.params.id);

    const companies = await Company.find();
    const companyMatch = matchCompanies(student, companies);

    res.status(200).json({
      success: true,
      eligibleCompanies: companyMatch.eligibleCompanies,
      notEligibleCompanies: companyMatch.notEligibleCompanies
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentInsights = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    ensureStudentOwnership(req, req.params.id);

    const readinessScore = calculateReadinessScore(student);
    const recommendations = generateRecommendations(student);
    const companies = await Company.find();
    const companyMatch = matchCompanies(student, companies);

    res.status(200).json({
      success: true,
      readinessScore,
      recommendations,
      eligibleCompanies: companyMatch.eligibleCompanies,
      notEligibleCompanies: companyMatch.notEligibleCompanies,
      student: {
        name: student.name,
        email: student.email,
        branch: student.branch,
        cgpa: student.cgpa,
        javaScore: student.javaScore,
        dsaScore: student.dsaScore,
        aptitudeScore: student.aptitudeScore,
        communicationScore: student.communicationScore,
        projectCount: student.projectCount,
        internshipCount: student.internshipCount
      }
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

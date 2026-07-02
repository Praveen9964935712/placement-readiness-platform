const express = require("express");
const router = express.Router();
const {
  getStudentReadiness,
  getStudentRecommendations,
  getEligibleCompanies,
  getStudentInsights
} = require("../controllers/studentAssessmentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
  "/:id/insights",
  verifyToken,
  authorizeRoles("student", "placement_officer"),
  getStudentInsights
);

router.get(
  "/:id/readiness",
  verifyToken,
  authorizeRoles("student", "placement_officer"),
  getStudentReadiness
);

router.get(
  "/:id/recommendations",
  verifyToken,
  authorizeRoles("student", "placement_officer"),
  getStudentRecommendations
);

router.get(
  "/:id/eligible-companies",
  verifyToken,
  authorizeRoles("student", "placement_officer"),
  getEligibleCompanies
);

module.exports = router;
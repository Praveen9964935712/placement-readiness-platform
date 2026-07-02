const express = require("express");

const router = express.Router();

const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  getEligibleStudents,
  deleteCompany,
  updateCompany
} = require("../controllers/companyController");

router.post("/", createCompany);

router.get("/", getAllCompanies);

router.get(
  "/:id",
  getCompanyById
);

router.delete(
  "/:id",
  deleteCompany
);

router.put(
  "/:id",
  updateCompany
);

router.get(
  "/:id/eligible-students",
  getEligibleStudents
);

module.exports = router;
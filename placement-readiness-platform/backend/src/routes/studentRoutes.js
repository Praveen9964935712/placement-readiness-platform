const express = require("express");

const router = express.Router();


const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
  getAnalytics,
  placeStudent
} = require("../controllers/studentController");

router.post("/", createStudent);

router.get("/", getAllStudents);

router.get("/search", searchStudents);

router.get("/analytics", getAnalytics);

router.get("/:id", getStudentById);

router.put("/:id/place", placeStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);


module.exports = router;
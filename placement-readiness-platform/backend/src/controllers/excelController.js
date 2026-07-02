const xlsx = require("xlsx");
const Student = require("../models/Student");

exports.uploadExcel = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const workbook = xlsx.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const data = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
    console.log("Excel Data:", data);

    const students = data.map((row) => ({
      name: row.Name,
      email: row.Email,
      branch: row.Branch.toUpperCase(),
      cgpa: row.CGPA,
      skills: row.Skills
        ? row.Skills.split(",").map(skill => skill.trim())
        : [],
      phone: row.Phone,
      graduationYear: row.GraduationYear,
      resumeLink: row.ResumeLink
    }));

    const insertedStudents =
      await Student.insertMany(
        students,
        { ordered: false }
      );

    res.status(200).json({
      success: true,
      message: "Students imported successfully",
      totalImported: insertedStudents.length
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
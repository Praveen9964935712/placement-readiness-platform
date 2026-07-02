const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      branch,
      cgpa,
      skills,
      graduationYear,
      phone,
      resumeLink
    } = req.body;

    const student = await Student.create({
      name,
      email,
      branch: branch.toUpperCase(),
      cgpa,
      skills,
      graduationYear,
      phone,
      resumeLink
    });

    res.status(201).json({
      success: true,
      message: "Student profile created",
      student
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.getAllStudents = async (req, res) => {
  try {

    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      students
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.getStudentById = async (req, res) => {
  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.updateStudent = async (req, res) => {
  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.deleteStudent = async (req, res) => {
  try {

    const student = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.searchStudents = async (req, res) => {
  try {

    const {
      branch,
      cgpa,
      graduationYear,
      skill
    } = req.query;

    let filter = {};

    if (branch) {
      filter.branch = branch;
    }

    if (cgpa) {
      filter.cgpa = { $gte: Number(cgpa) };
    }

    if (graduationYear) {
      filter.graduationYear = Number(graduationYear);
    }

    if (skill) {
      filter.skills = {
        $regex: skill,
        $options: "i"
      };
    }

    const students = await Student.find(filter);

    res.status(200).json({
      success: true,
      totalStudents: students.length,
      students
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.getAnalytics = async (req, res) => {
  try {

    // Total Students
    const totalStudents =
      await Student.countDocuments();

    // Placed Students
    const placedStudents =
      await Student.countDocuments({
        placementStatus: "Placed"
      });

    // Unplaced Students
    const unplacedStudents =
      await Student.countDocuments({
        placementStatus: "Not Placed"
      });

    // Average CGPA
    const averageCgpaData =
      await Student.aggregate([
        {
          $group: {
            _id: null,
            averageCgpa: {
              $avg: "$cgpa"
            }
          }
        }
      ]);

    const averageCgpa =
      averageCgpaData.length > 0
        ? averageCgpaData[0].averageCgpa
        : 0;

    // Branch-wise placed student statistics
    const branchStats =
      await Student.aggregate([
        {
          $group: {
            _id: "$branch",
            totalStudents: {
              $sum: {
                $cond: [
                  { $eq: ["$placementStatus", "Placed"] },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]);

    // Response
    res.status(200).json({
      success: true,
      totalStudents,
      placedStudents,
      unplacedStudents,
      placementPercentage:
        totalStudents > 0
          ? ((placedStudents / totalStudents) * 100).toFixed(2)
          : 0,
      averageCgpa: Number(
        averageCgpa.toFixed(2)
      ),
      branchStats
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.placeStudent = async (req, res) => {
  try {

    const { company, package } = req.body;

    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        {
          placementStatus: "Placed",
          company,
          package
        },
        {
          new: true
        }
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student placed successfully",
      student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
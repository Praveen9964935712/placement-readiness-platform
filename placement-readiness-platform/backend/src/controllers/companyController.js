const Company = require("../models/company");
const Student = require("../models/Student");

// Create Company
exports.createCompany = async (req, res) => {
  try {

    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get All Companies
exports.getAllCompanies = async (req, res) => {
  try {

    const companies = await Company.find();

    res.status(200).json({
      success: true,
      totalCompanies: companies.length,
      companies
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get Company by ID
exports.getCompanyById = async (req, res) => {
  try {

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    res.status(200).json({
      success: true,
      company
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get Eligible Students
exports.getEligibleStudents = async (req, res) => {
  try {

    const company =
      await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    const students =
      await Student.find({
        cgpa: {
          $gte: company.eligibleCgpa
        }
      });

    res.status(200).json({
      success: true,
      company: company.companyName,
      eligibleStudents: students.length,
      students
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
//delete company
exports.deleteCompany = async (req, res) => {

  try {

    const company =
      await Company.findByIdAndDelete(
        req.params.id
      );

    if (!company) {

      return res.status(404).json({
        success: false,
        message: "Company not found"
      });

    }

    res.status(200).json({
      success: true,
      message:
        "Company deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
//update company
exports.updateCompany = async (req, res) => {

  try {

    const company =
      await Company.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!company) {

      return res.status(404).json({
        success: false,
        message: "Company not found"
      });

    }

    res.status(200).json({
      success: true,
      message:
        "Company updated successfully",
      company
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


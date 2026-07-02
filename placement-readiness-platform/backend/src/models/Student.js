const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    branch: {
      type: String
    },

    cgpa: {
      type: Number,
      default: 0
    },

    javaScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    dsaScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    aptitudeScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    communicationScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    projectCount: {
      type: Number,
      default: 0,
      min: 0
    },

    internshipCount: {
      type: Number,
      default: 0,
      min: 0
    },

    skills: [
      {
        type: String
      }
    ],

    graduationYear: {
      type: Number
    },

    phone: {
      type: String
    },

    resumeLink: {
      type: String
    },

    placementStatus: {
      type: String,
      enum: ["Not Placed", "Placed"],
      default: "Not Placed"
    },
  
    company: {
      type: String,
      default: ""
    },

    package: {
      type: Number,
      default: 0
    },
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);
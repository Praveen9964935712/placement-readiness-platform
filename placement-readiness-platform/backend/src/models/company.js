const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true
    },

    package: {
      type: Number,
      required: true
    },

    eligibleCgpa: {
      type: Number,
      required: true
    },

    requiredJavaScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    requiredDsaScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Company", companySchema);
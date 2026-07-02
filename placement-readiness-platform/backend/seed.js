const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
const Student = require("./src/models/Student");
const Company = require("./src/models/company");
require("dotenv").config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for seeding");

    // Clear existing records
    await Promise.all([
      User.deleteMany({}),
      Student.deleteMany({}),
      Company.deleteMany({})
    ]);
    console.log("🗑️  Cleared existing users, students, and companies");

    const testUsers = [
      {
        name: "John Student",
        email: "student@gmail.com",
        password: "password123",
        role: "student"
      },
      {
        name: "Rohan Patel",
        email: "rohan@gmail.com",
        password: "password123",
        role: "student"
      },
      {
        name: "Officer Admin",
        email: "officer@gmail.com",
        password: "password123",
        role: "placement_officer"
      }
    ];

    const students = [
      {
        name: "John Student",
        email: "student@gmail.com",
        branch: "CSE",
        cgpa: 8.2,
        javaScore: 72,
        dsaScore: 68,
        aptitudeScore: 75,
        communicationScore: 82,
        projectCount: 3,
        internshipCount: 1,
        skills: ["Java", "React", "DSA"],
        graduationYear: 2025
      },
      {
        name: "Rohan Patel",
        email: "rohan@gmail.com",
        branch: "IT",
        cgpa: 6.8,
        javaScore: 54,
        dsaScore: 58,
        aptitudeScore: 62,
        communicationScore: 68,
        projectCount: 2,
        internshipCount: 0,
        skills: ["Python", "SQL", "Problem Solving"],
        graduationYear: 2025
      }
    ];

    const companies = [
      {
        companyName: "TCS",
        role: "Software Engineer",
        package: 6,
        eligibleCgpa: 7.0,
        requiredJavaScore: 60,
        requiredDsaScore: 60
      },
      {
        companyName: "Infosys",
        role: "System Engineer",
        package: 5,
        eligibleCgpa: 6.5,
        requiredJavaScore: 55,
        requiredDsaScore: 55
      },
      {
        companyName: "Wipro",
        role: "IT Analyst",
        package: 5,
        eligibleCgpa: 6.0,
        requiredJavaScore: 50,
        requiredDsaScore: 50
      },
      {
        companyName: "Amazon",
        role: "Development Engineer",
        package: 15,
        eligibleCgpa: 8.0,
        requiredJavaScore: 80,
        requiredDsaScore: 85
      }
    ];

    for (const user of testUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role
      });
      console.log(`✅ Created user: ${user.email}`);
    }

    for (const profile of students) {
      await Student.create(profile);
      console.log(`✅ Created student profile: ${profile.email}`);
    }

    for (const company of companies) {
      await Company.create(company);
      console.log(`✅ Created company: ${company.companyName}`);
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log("\nTest Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Student Login:");
    console.log("  Email: student@gmail.com");
    console.log("  Password: password123");
    console.log("\nStudent Login (Rohan):");
    console.log("  Email: rohan@gmail.com");
    console.log("  Password: password123");
    console.log("\nPlacement Officer Login:");
    console.log("  Email: officer@gmail.com");
    console.log("  Password: password123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error during seeding:", error.message);
    process.exit(1);
  }
};

seedDatabase();

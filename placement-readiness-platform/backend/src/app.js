const { verifyToken } = require("./middleware/authMiddleware");
const { authorizeRoles } = require("./middleware/roleMiddleware");
const companyRoutes =
  require("./routes/companyRoutes");

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authroutes");
const app = express();
const studentRoutes = require("./routes/studentRoutes");
const studentAssessmentRoutes = require("./routes/studentAssessmentRoutes");
const excelRoutes = require("./routes/excelRoutes");


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/students", studentAssessmentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/excel", excelRoutes);

app.get(
  "/api/admin",
  verifyToken,
  authorizeRoles("placement_officer"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Placement Officer"
    });
  }
);

app.get(
  "/api/student",
  verifyToken,
  authorizeRoles("student"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Student"
    });
  }
);


app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working"
  });
});

app.get(
  "/api/protected",
  verifyToken,
  (req, res) => {
    res.json({
      success: true,
      message: "Protected route accessed",
      user: req.user
    });
  }
);

module.exports = app;
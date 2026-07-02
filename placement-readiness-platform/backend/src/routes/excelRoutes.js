const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  uploadExcel
} = require("../controllers/excelController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("file"),
  uploadExcel
);

module.exports = router;
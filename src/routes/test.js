import express from "express";
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Middleware to parse JSON bodies
const router = express.Router({});

// Function to create a folder if it doesn't exist
const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName = req.body.folderName || "test";

    const folderPath = path.join(__dirname, "..","uploads", folderName);
    createFolder(folderPath);
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// API endpoint to create a folder and upload a file
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("File is required");
  }

  res.send("File uploaded successfully");
});

export default router;

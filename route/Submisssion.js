const express = require("express");
const router = express.Router();
const multer = require("multer");
const {getPool} = require("../config/db") // mysql2 connection
const path = require("path");

// Setup multer for file uploads (STL only here)
const storage = multer.memoryStorage(); // Store in memory (not on disk)
const upload = multer({ storage });

router.post("/upload-stl", upload.any(), async (req, res) => {
  console.log("✅ Multer received:");
  console.log("Files:", req.files);
  console.log("Body:", req.body);

  res.json({ status: "OK" });
});
module.exports = router;



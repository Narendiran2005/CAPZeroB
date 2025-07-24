const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Create directories if they don't exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (file.fieldname === "thumbnailImage") {
      folder = "uploads/thumbnails";
    } else if (file.fieldname === "technicalDiagram") {
      folder = "uploads/diagrams";
    } else if (file.fieldname === "stlFile") {
      folder = "uploads/stl";
    }

    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = req.user?.id || Date.now(); // Or use challenge ID if available

    let suffix = "";
    if (file.fieldname === "thumbnailImage") suffix = "thumbnail";
    else if (file.fieldname === "technicalDiagram") suffix = "technical";
    else if (file.fieldname === "stlFile") suffix = "model";

    const filename = `${id}-${suffix}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
module.exports = {upload};
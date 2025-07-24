const express = require("express");
const router = express.Router();
const {upload} = require("../authmiddleware/upload");
const PracticeController = require("../controllers/PracticeController");


// Route to create a new practice challenge
router.post("/create",  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "technicalDiagram", maxCount: 1 },
    { name: "stlFile", maxCount: 1 },
  ]), PracticeController.createPracticeChallenge);

router.get("/managepractice", PracticeController.managePractice);
//router.get("/participants/:challengeId", PracticeController.getParticipants);  

router.get("/getpractice:id", PracticeController.getPractice);

module.exports = router;
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const ChallengesController = require("../controllers/ChallengesController");

router.post("/challenge/create", ChallengesController.CreateChallenge);

module.exports = router;
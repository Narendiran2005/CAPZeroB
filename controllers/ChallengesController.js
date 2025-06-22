const express = require('express');
const router = express.Router();
const ChallengeModel = require('../models/ChallengesModel');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const CreateChallenge = async (req, res) => {
  try {
    const user = req.user;
    const challengedata = req.body; 
    console.log("Received challenge data:", challengedata);
    const data = await ChallengeModel.createModel(user, challengedata);
    console.log("Data fetched successfully:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in getCreateChallengeP:', err.message);
    res.status(500).json({ error: 'Failed to fetch create challenge page data' });
  }
}

module.exports = {CreateChallenge};
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

const RegisterChallenge = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const user = req.user;
    console.log("Registering for challenge with ID:", challengeId);
    const data = await ChallengeModel.registerChallenge(challengeId, user);
    console.log("Registration successful:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in RegisterChallenge:', err.message);
    res.status(500).json({ error: 'Failed to register for challenge' });
  }
}

const GetChallenge = async (req, res) => {
  try {
    const challengeId = req.params.id;
    console.log("Fetching challenge details for ID:", challengeId);
    const data = await ChallengeModel.getChallengeDetails(challengeId);
    console.log("Fetched challenge details successfully:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in GetChallenge:', err.message);
    res.status(500).json({ error: 'Failed to fetch challenge details' });
  }
}

module.exports = {CreateChallenge, RegisterChallenge, GetChallenge};
const express = require('express');
const router = express.Router();

const PracticeModel = require('../models/PracticeModel');

const createPracticeChallenge = async (req, res) => {
  try {
    const user = req.user;
    const practiceData = req.body; 
    console.log("Received practice data:", practiceData);
    const files = {
      thumbnailImage: req.files.thumbnailImage?.[0]?.filename || null,
      technicalDiagram: req.files.technicalDiagram?.[0]?.filename || null,
      stlFile: req.files.stlFile?.[0]?.filename || null,
    };

    const fullData = {
      ...practiceData,
      ...files,
    };
    
    // Call the model to create a practice challenge
    const data = await PracticeModel.createPracticeChallenge(user, fullData);
    console.log("Full data to be saved:", fullData);
    //console.log("Practice challenge created successfully:", data);
    res.status(200).json(fullData);
  } catch (err) {
    console.error('Error in createPracticeChallenge:', err.message);
    res.status(500).json({ error: 'Failed to create practice challenge' });
  }
}

const managePractice = async (req, res) => {
  try {
    const user = req.user;
    console.log("User in managePractice:", user);
    if (!user || !user.id) {

      return res.status(401).json({ error: 'Unauthorized' });

    }
    const data = await PracticeModel.managePractice(user.id);
    res.status(200).json(data);
  } catch (error) {
    console.log('Error in managePractice:', error.message);
    console.error('Error in managePractice:', error);
    res.status(500).json({ error: 'Failed to fetch practice challenges' });
  }
}

const getPractice = async (req, res) => {
  try {
    const user = req.user;
    console.log("User in getPractice:", user);
    if (!user || !user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const data = await PracticeModel.getPractice(user.id);
    res.status(200).json(data);
  } catch (error) {
    console.log('Error in getPractice:', error.message);
    console.error('Error in getPractice:', error);
    res.status(500).json({ error: 'Failed to fetch practice challenges' });
  }
}
module.exports = {
  createPracticeChallenge ,
  managePractice,
  getPractice
}
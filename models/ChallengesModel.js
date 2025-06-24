const e = require("express");
const express = require("express");
const { getPool } = require('../config/db'); 
const router = express.Router();

const createModel = async (user, challengedata) => {
    const pool = getPool();
    console.log("Received challenge data:", challengedata);
    console.log("User data:", user);
    try {
        // Insert the challenge data into the database
        const [result] = await pool.execute(
            "INSERT INTO contests (organization_id, title, description, start_date, end_date, registration_deadline, max_participants, invite_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [user.id, challengedata.title, challengedata.description, challengedata.start_date, challengedata.end_date, challengedata.registration_deadline, challengedata.max_participants, challengedata.invite_token]
        );

        // Return the created challenge data
        return {
            id: result.insertId,
            user_id: user.id,
            title: challengedata.title,
            description: challengedata.description
        };
    } catch (error) {
        throw error;
    }
}

const registerChallenge = async (challengeId, user) => {
    const pool = getPool();
    try {
        // Check if the challenge exists
        const [challenge] = await pool.execute(
            "SELECT * FROM contests WHERE id = ?",
            [challengeId]
        );
        // check whether challenge completed or not
        if (challenge.length === 0 || new Date(challenge[0].registration_deadline) < new Date()) {
            throw new Error("Challenge not found or already completed");
        }
        // use triggers to check deadline and max participants and for automate in db

        // Register the user for the challenge
        await pool.execute(
            "INSERT INTO contest_registrations (contest_id, user_id) VALUES (?, ?)",
            [challengeId, user.id]
        );

        return { message: "Registration successful" };
    } catch (error) {
        throw error;
    }
}

const getChallengeDetails = async (challengeId) => {
    const pool = getPool();
    try {
        const [challenge] = await pool.execute(
            "SELECT * FROM contests WHERE id = ?",
            [challengeId]
        );

        if (challenge.length === 0) {
            throw new Error("Challenge not found");
        }
        
        return challenge[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {createModel, registerChallenge, getChallengeDetails, getChallengeDetails
};
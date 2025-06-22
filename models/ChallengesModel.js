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
module.exports = {createModel};
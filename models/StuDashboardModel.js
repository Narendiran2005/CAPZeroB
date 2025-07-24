const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { getPool } = require('../config/db'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 1. Basic user/project/whatever details
const fetchStuBasicDetails = async (user) => {
    const pool = getPool();
    try {

        const[newusers] = await pool.execute("SELECT * FROM users WHERE id = ? ", [user.id])
        const[student] = await pool.execute("SELECT * FROM student_profiles WHERE user_id = ? ", [user.id]) 
        
        if (newusers.length == 0) {

            throw new Error('No username found');
            
        } 
        const users = newusers.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar_url: user.avatar_url || null,
            is_verified: user.is_verified,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }));
       
       
        return {
            head: users[0],
            details: student[0]
        };


    } catch (error) {
        throw error;
        
    }
  


  
};
const fetchStuContestDetails = async (user) => {

    const pool = getPool();
    try {
        const [contests] = await pool.execute("SELECT * FROM historical_contests_test WHERE user_id = ? ORDER BY start_time DESC", [user.id]);
        
        if (contests.length === 0) {
            throw new Error('No contests found');
        }

        return contests.map(contest => ({
            id: contest.id,
            name: contest.name,
            start_time: contest.start_time,
            end_time: contest.end_time,
            is_active: contest.is_active,
            is_upcoming: contest.is_upcoming,
            leaderboard_url: contest.leaderboard_url || null
        }));
    } catch (error) {
        throw error;
    }
  
};

const fetchStuHistoricalData = async () => {
 
};

const updateStuDashboardData = async (user, updatedData) => {
    const pool = getPool();
    try {
        // Validate the updatedData object to ensure it contains the necessary fields
        if (!updatedData || !updatedData.name || !updatedData.gender || !user){
            throw new Error('Invalid data provided for update');
        }
         // Assuming the updated data is sent in the request body
        const sql = "UPDATE student_profiles SET full_name = ?, bio = ?, gender = ?, location = ?, website = ?, github_url = ?, linkedin_url = ? WHERE user_id = ?";
        const values = [updatedData.name, updatedData.bio, updatedData.gender, updatedData.location, updatedData.website, updatedData.github, updatedData.linkedin, user.id];
        // Execute the SQL query with the provided values
        const [result] = await pool.execute(sql, values);        
    } catch (error) {
        throw error; 
    }  

}



module.exports = {fetchStuBasicDetails, fetchStuContestDetails, fetchStuHistoricalData, updateStuDashboardData};

// // 2. Contest details (e.g., active, upcoming, leaderboard)


// // 3. Historical chart data (e.g., trends, performance)





const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { getPool } = require('../config/db'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 1. Basic user/project/whatever details
const fetchBasicDetails = async (user) => {
    const pool = getPool();
    try {

        const[rows, fields] = await pool.execute("SELECT * FROM users WHERE id = ? ", [user.id])
        
        if (rows.length == 0) {

            throw new Error('No username found');
            
        } 
        const[linkrows, linkfields] = await pool.execute("SELECT * FROM links WHERE id = ? ", [user.id])
        return rows[0];


    } catch (error) {
        throw error;
        
    }
  


  
};
const fetchContestDetails = async () => {
  
};

const fetchHistoricalData = async () => {
 
};



module.exports = {fetchBasicDetails, fetchContestDetails, fetchHistoricalData};

// // 2. Contest details (e.g., active, upcoming, leaderboard)


// // 3. Historical chart data (e.g., trends, performance)





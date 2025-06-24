const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { getPool } = require('../config/db'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { head } = require('../route/DashRoute');

const fetchOrgBasicDetails = async (user) => {

    const pool = getPool();
    try{
        const [org] = await pool.execute("SELECT * FROM users WHERE id = ?", [user.id])
        if (org.length == 0) {
            throw new Error('No organization found');
        }
        const [orgDetails] = await pool.execute("SELECT * FROM organization_profiles WHERE user_id = ?", [user.id]);
        
        return {
            head: org[0],
            details: orgDetails[0]
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {fetchOrgBasicDetails}
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { getPool } = require('../config/db'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const authenticateUser = async (username, password_hased) => {
    
    const pool = getPool();
    try {

        const [rows, fields] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [username]
        );

        if (rows.length === 0) {
            throw new Error('No username found');
        }

        const user = rows[0];

       
        const passwordValid = await bcrypt.compare(password_hased, user.password_hash);
        if (!passwordValid) {
            throw new Error('Invalid credentials!');
        }

      
        const token = jwt.sign({ username: user.username, type: user.role }, "process.env.JWT_SECRET", { expiresIn: "1h" });
        const encryptedToken = CryptoJS.AES.encrypt(token, 'process.env.SECRET_KEY').toString();

        return { user, encryptedToken };
    } catch (error) {
        throw error; 
    }
};

const insertUser = async (userObj) => {
   
    const pool = getPool();
     try {
        const id = generateUUID(); // Generate a UUID for the user
        const hashedPassword = await bcrypt.hash(userObj.password, 10); // Hash the password
        const sql = `INSERT INTO users (id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`;
        
        const values = [id, userObj.username, userObj.email, hashedPassword, userObj.role];
        console.log(values)
        const [result] = await pool.execute(sql, values);
        return result;
    } catch (error) {
        throw error; 
    }

  };

function generateUUID() {
  return uuidv4(); // returns 36-character UUID v4
}






module.exports = { authenticateUser, insertUser };

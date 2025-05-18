const express = require("express");
const cors = require('cors'); 
const router = express.Router();
require("dotenv").config();
const { authenticateUser, insertUser } = require("../models/UserModel");


  

router.use(cors({
    // origin: '*', // Allow all origins (you can specify a specific origin if needed)
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    // allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    // credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const { user, encryptedToken } = await authenticateUser(email, password, role);
        res.json({ message: "Login successful!", token: encryptedToken });
    } catch (error) {
        console.error("Error during login:", error);
        if (error.message === 'No username found') {
            return res.status(400).json({ error: "No username found" });
        }
        if (error.message === 'Invalid credentials!') {
            return res.status(400).json({ error: "Invalid credentials!" });
        }
        res.status(500).json({ error: "Server error" });
    }
});

router.post('/register', async (req, res) => {
    try {
      const user = req.body; 
      console.log("User data:", user);
      // Validate user data here (e.g., check for required fields, valid email format, etc.)    
      
  
      const result = await insertUser(user);
      res.status(201).json({ message: "User registered successfully", insertId: result.insertId });
    } catch (error) {
      console.error("Insert error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });


module.exports = router;
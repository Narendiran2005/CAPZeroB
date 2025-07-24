const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./config/db');
const authRoute = require("./route/authRoute");
const dotenv = require('dotenv');
const DashRoute = require("./route/DashRoute");
const {authMiddleware, authorizeRoles } = require("./authmiddleware/authMiddleware");
const ChallengesRoute = require("./route/ChallengesRoute");
const practiceRoute = require("./route/PracticeRoute");
const SubmissionController = require("./route/Submisssion.js");
app.use(express.json());
app.use(cors());

dotenv.config();
connectDB();

// Define routes

app.use("/auth", authRoute);
app.use("/dash", authMiddleware, DashRoute);
app.use("/api/challenge", authMiddleware, authorizeRoles("organization", "Organization"), ChallengesRoute);
app.use("/api/practice", authMiddleware, authorizeRoles("organization", "Organization"), practiceRoute);
app.use("/api/submission", authMiddleware, SubmissionController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
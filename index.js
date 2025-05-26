const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./config/db');
const authRoute = require("./route/authRoute");
const dotenv = require('dotenv');
const DashRoute = require("./route/DashRoute");
const authMiddleware = require("./authmiddleware/authMiddleware");
app.use(express.json());
app.use(cors());

dotenv.config();
connectDB();

// Define routes

app.use("/auth", authRoute);
app.use("/api/dash", authMiddleware, DashRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
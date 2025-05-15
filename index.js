const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./config/db');
const authRoute = require("./route/authRoute");
app.use(express.json());
app.use(cors());

connectDB();

// Define routes

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
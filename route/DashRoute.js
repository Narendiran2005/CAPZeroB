const express = require("express");
const router = express.Router();

const StuDashboardController = require("../controllers/StuDashboardController")
const OrgDashboardController = require("../controllers/OrgDashboardController");

// Import necessary modules
// router.use("/dash", authMiddleware); // Apply auth middleware to all /dash routes

router.get("/basic", (req, res, next) => {
    // Basic route to get student dashboard data
    const role = req.user.role; // Assuming req.user is set by an auth middleware
    if (role === "student") {
        StuDashboardController.getBasicDashboardData(req, res, next);
    }else if (role === "organization") {
        OrgDashboardController.getOrgBasicDashboardData(req, res, next);
    }
});


module.exports = router;
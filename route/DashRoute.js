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
        StuDashboardController.getStuBasicDetails(req, res, next);
    }else if (role === "organization") {
        OrgDashboardController.getOrgBasicDashboardData(req, res, next);
    }
});

router.patch("/update" , (req, res, next) => {
    // Route to update student dashboard data
    const role = req.user.role; // Assuming req.user is set by an auth middleware
    if (role === "student") {
        StuDashboardController.updateStuDashboardData(req, res, next);
    }// else if (role === "organization") {
    //     OrgDashboardController.updateOrgDashboardData(req, res, next);
    // }
});


module.exports = router;
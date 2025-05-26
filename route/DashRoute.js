const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/DashboardController")

// Import necessary modules
// router.use("/dash", authMiddleware); // Apply auth middleware to all /dash routes

router.get("/basic", DashboardController.getBasicDetails);

router.get("/stats", async(req, res) => {



});


router.patch("/edit", async (req, res) => {
    // try {
    //     const user = req.user; // Assuming user is set in a middleware
    //     if (!user) {
    //         return res.status(401).json({ error: "Unauthorized" });
    //     }

    //     // Example: update user dashboard info (customize as needed)
    //     const { dashboardData } = req.body;
    //     if (!dashboardData) {
    //         return res.status(400).json({ error: "No dashboard data provided" });
    //     }

    //     // TODO: Update dashboard data in your database here
    //     // Example: await updateDashboard(user.id, dashboardData);

    //     res.json({ message: "Dashboard updated successfully" });
    // } catch (error) {
    //     console.error("Error updating dashboard:", error);
    //     res.status(500).json({ error: "Server error" });
    // }
});



module.exports = router;
const DashboardModel = require('../models/StuDashboardModel');

// GET /api/dashboard/basic
const getStuBasicDetails = async (req, res) => {
  try {
    const user = req.user
    const data = await DashboardModel.fetchStuBasicDetails(user);
    console.log("Data fetched successfully:", data);
    res.status(200).json(data);
    console.log(data)
  } catch (err) {
    console.error('Error in getBasicDetails:', err.message);
    res.status(500).json({ error: 'Failed to fetch basic details' });
  }
};

const getStuContestDetails = async (req, res) => {
  try {
    const data = await dashboardModel.fetchContestDetails();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in getContestDetails:', err.message);
    res.status(500).json({ error: 'Failed to fetch contest details' });
  }
};

const getStuHistoricalData = async (req, res) => {
  try {
    const data = await dashboardModel.fetchHistoricalData();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in getHistoricalData:', err.message);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
};

const updateStuDashboardData = async (req, res) => {
  try {
    const user = req.user;
    const updatedData = req.body; // Assuming the updated data is sent in the request body
    const result = await DashboardModel.updateStuDashboardData(user, updatedData);  
  }catch (err) {
    console.error('Error in updateStuDashboardData:', err.message);
    res.status(500).json({ error: 'Failed to update dashboard data' });
  }

}


module.exports = {getStuBasicDetails, getStuContestDetails, getStuHistoricalData, updateStuDashboardData};






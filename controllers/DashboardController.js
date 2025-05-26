const DashboardModel = require('../models/DashboardModel');

// GET /api/dashboard/basic
const getBasicDetails = async (req, res) => {
  try {
    const user = req.user
    const data = await DashboardModel.fetchBasicDetails(user);
    res.status(200).json(data);
    console.log(data)
  } catch (err) {
    console.error('Error in getBasicDetails:', err.message);
    res.status(500).json({ error: 'Failed to fetch basic details' });
  }
};

const getContestDetails = async (req, res) => {
  try {
    const data = await dashboardModel.fetchContestDetails();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in getContestDetails:', err.message);
    res.status(500).json({ error: 'Failed to fetch contest details' });
  }
};

const getHistoricalData = async (req, res) => {
  try {
    const data = await dashboardModel.fetchHistoricalData();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in getHistoricalData:', err.message);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
};


module.exports = {getBasicDetails, getContestDetails, getHistoricalData};






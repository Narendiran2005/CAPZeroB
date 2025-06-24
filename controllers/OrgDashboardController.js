const OrgDashboardModel = require('../models/OrgDashboardModel');

const getOrgBasicDashboardData = async (req, res, next) => {
  try {
    const user = req.user;
    const data = await OrgDashboardModel.fetchOrgBasicDetails(user);
    console.log("Data fetched successfully:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in getOrgBasicDashboardData:', err.message);
    res.status(500).json({ error: 'Failed to fetch basic details' });
  }
};

module.exports = { getOrgBasicDashboardData };
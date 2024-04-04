const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaignModel');

// GET all pending campaigns
router.get('/approved', async (req, res) => {
  try {
    const approvedCampaigns = await Campaign.find({ status: 'approved' });
    res.json(approvedCampaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
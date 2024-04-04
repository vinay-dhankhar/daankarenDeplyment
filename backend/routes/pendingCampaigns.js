// backend/routes/campaigns.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaignModel');

// GET all pending campaigns
router.get('/pending', async (req, res) => {
  try {
    const pendingCampaigns = await Campaign.find({ status: 'pending' });
    res.json(pendingCampaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// models/Donation/donationModel.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);

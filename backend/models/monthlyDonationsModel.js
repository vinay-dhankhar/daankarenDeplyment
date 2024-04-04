// models/MonthlyDonation/monthlyDonationModel.js
const mongoose = require('mongoose');

const MonthlyDonationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MonthlyDonation', MonthlyDonationSchema);

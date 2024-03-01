// models/User/userModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role:{type:String, default:"user"},
  monthlyDonations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MonthlyDonation' }],
  onceDonations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }]
});

module.exports = mongoose.model('User', UserSchema);

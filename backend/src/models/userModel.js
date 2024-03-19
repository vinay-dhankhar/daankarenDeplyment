// models/User/userModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role:{type:String, default:"user"},
  campaignsDonated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaigns' }],
  ridesDone:[{type:mongoose.Schema.Types.ObjectId , ref:'Rides'}],
  ridesInitiated:[{type:mongoose.Schema.Types.ObjectId , ref:'Rides'}],
  // campaignsDonated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaigns' }],
  // campaignsDonated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaigns' }],
  profileImg : {type:String , default:""}
});

module.exports = mongoose.model('User', UserSchema);

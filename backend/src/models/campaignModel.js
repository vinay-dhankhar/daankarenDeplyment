const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: true
  },
  goalAmount: {
    type: Number,
    required: true
  },
  campaignCategory: {
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Array of image URLs
    required: false
  },
  contactNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status:{
    type:String,
    default: "pending"
  },
  amountCollected:{
    type:Number,
    default:0,
  },
  buildingNo:{
    type:String,
    required:true,
  },
  pincode:{
    type:String,
    required:true,
  },
  city:{
    type:String,
    required:true,
  },
  state:{
    type:String,
    required:true,
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;

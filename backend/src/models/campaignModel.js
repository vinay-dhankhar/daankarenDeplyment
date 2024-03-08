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
  city:{
    type:String,
    required:true,
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;

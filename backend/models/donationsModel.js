// models/Donation/donationModel.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaign:{
    type:mongoose.ObjectId,
    ref:'campaign'
  },
  payment:{},
  donater:{
    type:mongoose.ObjectId,
    ref:'User'
  },
  status:{
    type:String,
    default:'Not Process',
    enum:["Not Process","Processing","Processed"]
  }


},
{timestamp:true}
);

module.exports = mongoose.model('donation', donationSchema);

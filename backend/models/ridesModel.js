const mongoose = require('mongoose');

const ridesSchema = mongoose.Schema({
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    volunteer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    donation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ItemDonation",
    },
    imageUrl:{
        type:String,
        default:"",
    },
    status:{
        type:String,
        enum:[ "volunteered" ,"picked" , "delivered" , "seen"],
        default:"volunteered",
    }
});

module.exports = mongoose.model("Rides" , ridesSchema )
const mongoose = require('mongoose');

const itemDonationSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    contact:{
        type:Number,
        required:true,
    },
    itemsType:{
        type:[String],
        required:true,
    },
    pickupAddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    scheduledDate:{
        type:Date,
        required:true,
        default: () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3); // Add three days to the current date
            return currentDate;
        }
    },
    status:{
        type:String,
        default:"pending",
    },
});

module.exports = mongoose.model("ItemDonation" , itemDonationSchema);
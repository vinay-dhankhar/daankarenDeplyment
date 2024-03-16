const mongoose = require('mongoose');

const NgoSchema = mongoose.Schema({
    orgName : {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    poc:{
        type:String,
        required:true,
    },
    pocDesignation:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    motive:{
        type:String,
        required:true,
    },
    address:{
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
    status:{
        type:String,
        enum:["pending" , "approved"],
        default:"pending",
    }
});

module.exports = mongoose.model("Ngo" , NgoSchema);
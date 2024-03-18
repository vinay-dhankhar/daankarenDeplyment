const Rides = require('../models/ridesModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const ItemDonation = require('../models/itemDonationModel');

const nodemailer = require('nodemailer');
const MAIL_HOST = "smtp.gmail.com"
const MAIL_USER = "dhankharvinay12@gmail.com"
const MAIL_PASS = "rriuwmdmfbfzkonj"
const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

const handleRides = async(req , res) =>{
    try{
        const volunteer = req.user.userId;
        const donor = req.body.donor;
        const items = req.body.items;
        const newRide = new Rides({
            donor,
            volunteer,
            donation:items,
        });

        const savedRide = await newRide.save();
        const rideInit = await User.findByIdAndUpdate(donor ,
            {$push : {ridesInitiated:savedRide._id}} ,
            {new:true}  );

        const rideDone = await User.findByIdAndUpdate(volunteer ,
            {$push : {ridesDone:savedRide._id}} , 
            {new:true} );
        // console.log(rideDone);

        const updatedRequest = await ItemDonation.findByIdAndUpdate(items , {
            status:"pickedup",
        } , {new:true});

        const info = await transporter.sendMail({
            from: MAIL_USER, // sender address
            to: rideInit.email, // list of receivers
            subject: "Your donation Request has been Accepted", // Subject line
            text: "Details of Rider are:", // plain text body
            html: `<h1>Name: ${rideDone.username} </h1>`, // html body
          });

          console.log("Info : " , info);

        res.status(200).json({
            success:true,
            message:"Entry Saved Successfully",
        })
    }
    catch(error){
        console.log(error);
        console.log("Error handling volunteer controller");
    }
} 



const getRidesVolunteered = async(req , res) =>{
    try{
        const {userId} = req.params;
        const volunteeredRides = await Rides.find({ volunteer : userId , status:"volunteered" }).populate('donor' , 'username email').populate('donation');
        const pickedRides = await Rides.find({ volunteer : userId , status:"picked" }).populate('donor' , 'username email').populate('donation');
        const finalRides = pickedRides.concat(volunteeredRides);
        console.log("Final ride volun : " , finalRides );
        res.status(200).json(finalRides);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error",
        })
    }
}

const getRidesCompleted = async(req , res) =>{
    try{
        const {userId} = req.params;
        const updatedUser = await Rides.find({ volunteer : userId , status:"delivered" }).populate('donor' , 'username email').populate('donation');
        // console.log( "Final User Object is : " , updatedUser);
        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error",
        })
    }
}

const getRidesInitiated = async(req , res) =>{
    try{
        const {userId} = req.params;
        const updatedUser = await Rides.find({ donor : userId}).populate('donor').populate('donation').populate('volunteer' , 'username');
        // console.log( "Final User Object is : " , updatedUser);
        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error",
        })
    }
}

const handlePick = async(req , res) =>{
    try{
        console.log("Req : " , req);
        const {rideId} = req.params;
        console.log(rideId);
        const updatedRide = await Rides.findByIdAndUpdate(rideId , {
            status:"picked",
        } , {new:true});

        console.log(updatedRide);
        res.status(200);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error",
        })
    }
}


module.exports = {handleRides , getRidesVolunteered , getRidesCompleted , getRidesInitiated , handlePick};
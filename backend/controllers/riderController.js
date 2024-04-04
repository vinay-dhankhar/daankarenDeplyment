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
            html: `<p>Name: ${rideDone.username}</p><p>Contact:${rideDone.contact}</p>`, // html body
          });

        //   console.log("Info : " , info);

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
        // console.log("Final ride volun : " , finalRides );
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
        const updatedUser = await Rides.find({ donor : userId , status:{$ne : "seen"}}).populate('donor').populate('donation').populate('volunteer' , 'username');
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
        // console.log("Req : " , req);
        const {rideId} = req.params;
        // console.log(rideId);
        const updatedRide = await Rides.findByIdAndUpdate(rideId , {
            status:"picked",
        } , {new:true});

        // console.log(updatedRide);
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

const handleDelivery = async (req , res) => {
    try{
        // console.log("Req : " , req);
        const {rideId} = req.params;
        const fileDownloadURL = req.fileDownloadURL;

        const data = await Rides.findById(rideId).populate('donor');

        // console.log(fileDownloadURL);
        // console.log(rideId);
        const updatedRide = await Rides.findByIdAndUpdate(rideId , {
            status:"delivered",
            imageUrl:fileDownloadURL,
        } , {new:true});


        const info = await transporter.sendMail({
            from: MAIL_USER, // sender address
            to: data.donor.email, // list of receivers
            subject: "Your donation has been delivered successfully", // Subject line
            html: `Click here to view the image : <a href=${fileDownloadURL}>Donation Image</a> `,
          });

        // console.log(updatedRide);
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

const handleSeen = async(req , res)=>{
    try{

        const {rideId} = req.params;

        const updatedRide = await Rides.findByIdAndUpdate(rideId , {
            status:"seen",
        } , {new:true});

        res.status(200).json({
            success:true,
            message:"Seen updated",
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Failed to update Seen",
        })
    }
}


module.exports = {handleRides , getRidesVolunteered , getRidesCompleted , getRidesInitiated , handlePick , handleDelivery , handleSeen};
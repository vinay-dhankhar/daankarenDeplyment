const { response } = require('express');
const Ngo = require('../models/NgoModel');

const registerOrg = async(req , res) =>{
    try{
        const {orgName,
        email,
        contactNumber,
        motive,
        poc,
        pocDesignation,
        address,
        city,
        pincode,
        state} = req.body.formData;

        const alreadyReg = await Ngo.findOne({email});
        console.log("Already Reg : " , alreadyReg);

        if(alreadyReg){
            res.status(401).json({message:"User Already Exists"});
            return;
        }

        const newNgo = new Ngo({
            orgName,  
            email,
            contactNumber,
            motive,
            poc,
            pocDesignation,
            address,
            city,
            pincode,
            state
        });
        const savedNgo = await newNgo.save();

        res.status(200).json({
            success:true,
            message:"Your request has been submitted",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            meassge:"Error occurred while submitting the request",
        })
    }
}

const deleteRegistrationRequest = async(req,res) => {
    try{
        const {registrationID} = req.params;

        const response = await Ngo.findByIdAndDelete(registrationID);
        console.log(response);
        res.status(200).json({
            success:true,
            message:"Entry deleted successfully",
        })
    }
    catch(error){
        console.log("Error deleting the request in Controller : " , error);
    }
}

const approveRegistrationRequest = async(req ,res) => {
    try{
        const {registrationID} = req.params;
        const response = await Ngo.findByIdAndUpdate(registrationID , {
            status:'approved',
        } , {new:true});
        console.log(response);

        res.status(200).json({
            success:true,
            message:"Entry Approved",
        })
    }
    catch(error){
        console.log("Error in controller : " , error);
    }
}

const getPendingRegistrations = async (req, res) => {
    try {
      const pendingRegistrations = await Ngo.find({ status: 'pending' });
      res.json(pendingRegistrations);
    } catch (error) {
      console.error('Error fetching pending registrations:', error);
      res.status(500).json({ error: 'Failed to fetch pending registrations' });
    }
  };

module.exports = {registerOrg,deleteRegistrationRequest,approveRegistrationRequest,
    getPendingRegistrations};
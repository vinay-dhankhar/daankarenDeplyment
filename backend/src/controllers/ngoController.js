const Ngo = require('../models/NgoModel');

const registerOrg = async(req , res) =>{
    try{
        // console.log(req.body);
        // console.log(req.user);
        // console.log(req);
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

module.exports = {registerOrg};
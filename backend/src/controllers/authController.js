const User= require('../models/userModel');
const bcrypt=require('bcrypt');
const signup=async(req,res)=>{
    try{
        const {username,password,email}=req.body;
        console.log("username"+username+"pasw"+password+"email"+email);
        const existingUser = await User.findOne({ email });
        if(existingUser){
            res.status(401).json({message:"User already Exists"});
            return;
        }
        else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=new User({
            username,
            password:hashedPassword,
            email,
            role:"user",
        })
        await newUser.save();
        res.status(200).json({message:"Signup Success"});
    }
    } catch(error){
        res.status(500).json({message :"Signup failed"});
    }

}
module.exports={signup};
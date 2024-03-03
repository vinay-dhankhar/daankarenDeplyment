const User= require('../models/userModel');
const bcrypt=require('bcryptjs');

exports.signup = async(req,res)=>{
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

exports.login = async(req , res)=>{
    try{
        const {email , password} = req.body;
        console.log("email"+email+"psw"+password);
        const user = await User.findOne({email});
        if(!user){
            res.status(402).json({message:"No such Email Found"});
            return;
        }

        const isPasswordValid = await bcrypt.compare(password , user.password);
        if(!isPasswordValid){
            res.status(402).json({message:"Incorrect Password"});
            return ;
        }
        res.status(200).json({message:"Login Successful"});
    }
    catch(error){
        res.status(500).json({message :"Login failed in AuthControllers"});
    }
}
module.exports = {
    signup: exports.signup,
    login: exports.login
};
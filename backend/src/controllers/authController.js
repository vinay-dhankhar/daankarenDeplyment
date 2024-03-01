const User= require('../models/userModel');
const signup=async(req,res)=>{
    try{
        const {username,password,email}=req.body;
        console.log("username"+username+"pasw"+password+"email"+email);
        const existingUser = await User.findOne({ email });
        if(existingUser){
            res.json(401).json({message:"User already Exists"});
            return;
        }
        const newUser=new User({
            username,
            password,
            email,
            role:"user",
        })
        await newUser.save();
        res.status(200).json({message:"Signup Success"});
    } catch(error){
        res.status(500).json({message :"Signup failed"});
    }

}
module.exports={signup};
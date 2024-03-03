const User= require('../models/userModel');
const bcrypt=require('bcrypt');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");

  
const uploadMiddleware = async (req, res, next) => {
    try {
      const storage = getStorage();
      const uploadedFiles = [];
    //   console.log("size="+req.files.length)
    //   console.log("size="+req.files.length)
    const files = req.files;
    console.log("size="+files.length)
      const dateTime = new Date().toISOString().replace(/:/g, '-');
      
      // Loop through each file in req.files array
      for (const file of files) {
        console.log("yeahh working")
        const fileName = `${dateTime}-.jpeg`;
        const storageRef = ref(storage, `files/${fileName}`);
        const metadata = {
          contentType: file.mimetype,
        };
  
        // Upload the file to the storage bucket
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
  
        // Get the public URL of the uploaded file
        const downloadURL = await getDownloadURL(snapshot.ref);
  
        // Push the download URL to the uploadedFiles array
        uploadedFiles.push(downloadURL);
      }
  
      // Store the array of download URLs in the request object
      req.filesDownloadURLs = uploadedFiles;
  
      console.log('Files successfully uploaded.');
      next();
    } catch (error) {
      console.error('Error in uploadMiddleware:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

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
module.exports={signup,uploadMiddleware};
const User= require('../models/userModel');
const bcrypt=require('bcryptjs');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const jwt=require('jsonwebtoken');



// Example of creating a new ObjectId



const uploadMiddleware = async (req, res, next) => {
    try {
      const storage = getStorage();
      const uploadedFiles = [];
    //   console.log("size="+req.files.length)
    //   console.log("size="+req.files.length)
    const files = req.files;
    // console.log("size="+files.length)
      const dateTime = new Date().toISOString().replace(/:/g, '-');
      
      // Loop through each file in req.files array
      for (const file of files) {
        // console.log("file="+file.originalname);
        // console.log("yeahh working")
        const fileName = `${file.originalname}-.jpeg`;
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
        const {username,password,email,contact}=req.body;
        // console.log("username"+username+"pasw"+password+"email"+email);
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
            contact,
            role:"user",
        })
        await newUser.save();
        res.status(200).json({message:"Signup Success"});
    }
    } catch(error){
        res.status(500).json({message :"Signup failed"});
    }

}

const login = async(req , res)=>{
  try{
      const {email , password} = req.body;
      // console.log("email"+email+"psw"+password+"inlofin");
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
      else{
        const token=jwt.sign({email:user.email,userId:user._id},'your-secret-key', { expiresIn: '1h' });
        res.cookie('Login',token,{
          httpOnly: false,
          secure: true,
          maxAge: 3600000, 
        })
        res.json({
          uid:user._id,
          role:user.role,
          message:"Login Successful",
        })
      }
  }
  catch(error){
      res.status(500).json({message :"Login failed in AuthControllers"});
  }
}

const logout = (req, res) => {
  // Clear the authentication-related cookies
  res.clearCookie('token');
  res.clearCookie('Login');
  // Send a response to the client
  res.status(200).json({ message: 'Logout successful!' });
  // ... existing logout route logic ...
};

// Middleware
const verifyToken = (req ,res , next) => {
  // console.log("Req : " , req);
  const token = req.headers.cookies.split('=')[1];
  // console.log("Token : " , token);
  if (!token) return res.status(401).json({ message: 'Token is missing' });

  try {
      const decoded = jwt.verify(token, 'your-secret-key');
      req.user = decoded;
      // console.log("Req : " , req);
      next();
  } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
  }
} 
const fetchUserDetails = async (req, res) => {
  try {
    const userId = getUserIdFromCookie(req); // Assuming this returns an object like { userId: '65e5274b28e3610a5599ffac' }
      
      if (!userId) {
          return res.status(400).json({ error: 'User ID not found in cookie' });
      }

      // console.log("uid=" + userId);
      const user = await User.findById(userId);

      if (!user) {
          console.log("User not found");
          return res.status(404).json({ error: 'User not found' });
      }
      // console.log("usnname="+user.username)
      user.password = undefined;

      // Sending response after await completes
      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
const getUserIdFromCookie = (req) => {
  // Get the 'Cookie' header from the request
  const cookieHeader = req.headers.cookies;
  // console.log(`cookieheader=${cookieHeader}`)

  if (!cookieHeader) {
    return null;
  }

  // Split the 'Cookie' header string into individual cookies
  const cookies = cookieHeader.split(';');

  // Find the cookie containing the JWT
  const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('Login='));
  // console.log("jwtCookie="+jwtCookie);

  if (!jwtCookie) {
    return null;
  }
  // console.log(jwtToken);

  // Extract the JWT from the cookie
  const token = jwtCookie.split('=')[1];
  // console.log("token="+token);
  // console.log("tok"+token);

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, 'your-secret-key');

    // Extract the user ID from the decoded JWT payload
    const userId = decoded.userId;

    return userId;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
};

const addressImage = async (req, res, next) => {
  try {
    // console.log("Hello");
    // console.log("Req :", req);
    const storage = getStorage();
    
    const file = req.file;
    // console.log("File : " , file);

    const dateTime = new Date().toISOString().replace(/:/g, '-');

    const fileName = `${file.originalname}-.jpeg`;
    const storageRef = ref(storage, `files/${fileName}`);
    const metadata = {
        contentType: file.mimetype,
    };

      // Upload the file to the storage bucket
      const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
      // console.log("Snapshot : " , snapshot);

      // Get the public URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);
      // console.log("downloadURL : " , downloadURL);

    // Store the array of download URLs in the request object
    req.fileDownloadURL = downloadURL;

    console.log('Files successfully uploaded.');
    next();
  } catch (error) {
    console.error('Error in uploadMiddleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const handleProfile = async(req , res)=>{
  try{

    const {userId} = req.params;
    const fileDownloadURL = req.fileDownloadURL;

    const response = await User.findByIdAndUpdate(userId , {
      profileImg:fileDownloadURL,
    } , {new:true} );
    response.password = undefined;

    res.status(200).json({
      response,
      success:true,
      message:"Img uploaded",
    });

  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Profile Image Upload Failed",
    })
  }
}

module.exports={signup,uploadMiddleware , login,logout , verifyToken,fetchUserDetails , addressImage , handleProfile};
const Campaign = require('../models/campaignModel');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel')

const RequestCampaign = async (req, res) => {
    // console.log("Hello, I'm at RequestCampaign");

    try {
        // Extract data from the form
        const { campaignName, goalAmount, description, contactNumber ,buildingNo, pincode,city,state } = req.body;
        const imageUrls = req.filesDownloadURLs || []; // Extracting multiple image URLs

        // console.log("Campaign Name:", campaignName);
        // console.log("Goal Amount:", goalAmount);
        // console.log("Description:", description);
        // console.log("Contact Number:", contactNumber);
        // console.log("Image URLs:", imageUrls);
        const userId=getUserIdFromCookie(req);

        // Create a new Campaign instance
        const newCampaign = new Campaign({
            campaignName,
            goalAmount,
            description,
            contactNumber,
            city,
            images: imageUrls,
            buildingNo,
            pincode,
            state,
            userId,
             // Assigning multiple image URLs
        });

        // Save the new campaign to the database
        const savedCampaign = await newCampaign.save();
        res.status(201).json(savedCampaign); // Respond with the saved campaign data
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to create campaign' }); // Handle error
    }
};

const campaignDetails = async (req, res) => {
    // console.log("details of campaign");
    const { campaignId } = req.params;

    try {
        // console.log("campaignId=" + campaignId);
        const campaign = await Campaign.findById(campaignId);
        // console.log("campaign=" + campaign);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ error: 'Failed to fetch campaign details' });
    }
};
const campaignApprove=async(req,res)=>{
    const { campaignId } = req.params;

    try {
      // Fetch the campaign from the database
      const campaign = await Campaign.findById(campaignId);
  
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      // Update the campaign status to "approved"
      campaign.status = 'approved';
      
      // Save the updated campaign
      await campaign.save();
  
      // Send a success response
      res.json({ message: 'Campaign approved successfully' });
    } catch (error) {
      console.error('Error approving campaign:', error);
      res.status(500).json({ error: 'Failed to approve campaign' });
    }
}
const campaignDelete=async(req,res)=>{
    const { campaignId } = req.params;

    try {
      // Find the campaign by ID and delete it
      const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);
  
      if (!deletedCampaign) {
        // If the campaign with the specified ID doesn't exist, return 404
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      // If the campaign is successfully deleted, return success message
      res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
      // If an error occurs during deletion, return 500 with error message
      console.error('Error deleting campaign:', error);
      res.status(500).json({ error: 'Failed to delete campaign' });
    }
}

const getByCity = async (req , res) => {
  try {
    const { city } = req.body;
    const campaigns = await Campaign.find({ city,status:"approved" }); 
    if(!campaigns){
      return res.status(404).json({
        success:false,
        error:'Campaigns Not Found',
        message:'No campaign in the given city found'
      })
    }
    res.json(campaigns);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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

const fetchCampaignsOfUser=async (req,res)=>{
  const {userId}=req.params;
  // console.log('User Campaigns: uid='+userId);

  // Assuming Campaign.find() returns a Promise resolving to an array of Campaign documents
  try {
    const userCampaigns = await Campaign.find({ userId: String(userId), status: 'approved' });
    // console.log('User Campaigns:', userCampaigns.length);
    res.json(userCampaigns);
  } catch (error) {
    console.error('Error fetching user campaigns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  

}
// constgn'); // Assuming you have a Campaign model defined

const fetchDonatedCampaigns = async (req, res) => {
    const userId = req.params.userId;
    // console.log("uiddonated="+userId)

    try {
        // Assuming userId is a valid ObjectId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const campaignIds = user.campaignsDonated; // Assuming campaignsDonated is an array of campaign ObjectId's
        // console.log("cid="+campaignIds)
        // Fetch all campaigns with the given IDs
        const campaigns = await Campaign.find({ _id: { $in: campaignIds } });
        console.log("campa="+campaigns+"lemgth="+campaigns.length)

        // Send the fetched campaigns in response
        res.status(200).json({ campaigns });
    } catch (error) {
        console.error('Error fetching donated campaigns:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { RequestCampaign, campaignDetails,campaignApprove,campaignDelete , getByCity,fetchCampaignsOfUser, fetchDonatedCampaigns };

const Campaign = require('../models/campaignModel');

const RequestCampaign = async (req, res) => {
    console.log("Hello, I'm at RequestCampaign");

    try {
        // Extract data from the form
        const { campaignName, goalAmount, description, contactNumber } = req.body;
        const imageUrls = req.filesDownloadURLs || []; // Extracting multiple image URLs

        console.log("Campaign Name:", campaignName);
        console.log("Goal Amount:", goalAmount);
        console.log("Description:", description);
        console.log("Contact Number:", contactNumber);
        console.log("Image URLs:", imageUrls);

        // Create a new Campaign instance
        const newCampaign = new Campaign({
            campaignName,
            goalAmount,
            description,
            contactNumber,
            images: imageUrls // Assigning multiple image URLs
        });

        // Save the new campaign to the database
        const savedCampaign = await newCampaign.save();
        res.status(201).json({ message: "Success in uploading campaign" }); // Respond with the saved campaign data
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' }); // Handle error
    }
};

module.exports = { RequestCampaign };

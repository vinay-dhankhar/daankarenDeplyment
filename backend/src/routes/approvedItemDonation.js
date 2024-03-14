const express = require('express');
const router = express.Router();
const ItemDonation = require('../models/itemDonationModel');
const User = require('../models/userModel');

router.get('/approved' , async (req , res) => {
    try{
        const approvedDonations = await ItemDonation.find({status : "approved"});
        console.log(approvedDonations);

        const approvedDonationsWithUserData = await Promise.all(approvedDonations.map(async ticket => {
            const user = await User.findById(ticket.user);
            user.password = undefined;
            return {
                ticket,
                user,
            }
        } ));

        res.status(200).json(approvedDonationsWithUserData);
    }
    catch(error){
        console.log("Error in controller" , error);
    }
})

module.exports = router;
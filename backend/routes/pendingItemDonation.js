const express = require('express');
const router = express.Router();
const ItemDonation = require('../models/itemDonationModel');
const User = require('../models/userModel');

router.get('/pending' , async(req ,res) => {
    try{
        const pendingTickets = await ItemDonation.find({status:'pending'});

        const ticketsWithUserData = await Promise.all(pendingTickets.map(async ticket => {
            const user = await User.findById(ticket.user);
            user.password = undefined;
            return {
                ticket,
                user
            };
        }));
        res.status(200).json(
            ticketsWithUserData
        );
    }
    catch(error){
        console.log("Error in router:" , error);
        res.status(500).json({
            success:false,
            message:"Router error",
        });
    }
})

module.exports = router;
const express = require('express');
const router = exporess.Router();
const ItemDonation = require('../models/itemDonationModel');

router.get('/approved' , async (req , res) => {
    try{

    }
    catch(error){
        console.log("Error in controller" , error);
    }
})

module.exports = router;
const ItemDonation = require('../models/itemDonationModel');

const itemsDonationRequest = async (req ,res) =>{
    try{
        // console.log(req.body);
        // console.log(req.user);
        // console.log(req);
        const {name , contactNumber ,address,city,state,pincode,pickupScheduleDate} = req.body.formData;
        const {itemsToDonate} = req.body;
        const user = req.user.userId;

        // console.log("Items to don  " , itemsToDonate);

        const newDonation = new ItemDonation({
            user,
            contact:contactNumber,
            itemsType : itemsToDonate,
            pickupAddress:address,
            city,
            pincode,
            state,
            scheduledDate:pickupScheduleDate
        });
        const savedDonation = await newDonation.save();
        // console.log(savedDonation);
        const id = savedDonation._id;

        const res = await ItemDonation.findById(id).populate("user").exec();
        console.log("User is : " , res);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            meassge:"Error occurred while submitting the request",
        })
    }
}

const deleteDonationRequest = async(req,res) => {
    try{
        // console.log(req.params);
        const {donationID} = req.params;

        const response = await ItemDonation.findByIdAndDelete(donationID);
        res.status(200).json({
            success:true,
            message:"Entry deleted successfully",
        })
    }
    catch(error){
        console.log("Error deleting the request in COntroller : " , error);
    }
}

const approveDonationRquest = async(req ,res) => {
    try{
        const {donationID} = req.params;
        const response = await ItemDonation.findByIdAndUpdate(donationID , {
            status:'approved',
        } , {new:true});

        // console.log(response);
        res.status(200).json({
            success:true,
            message:"Entry Approved",
        })
    }
    catch(error){
        console.log("Error in controller : " , error);
    }
}

module.exports = {itemsDonationRequest , deleteDonationRequest , approveDonationRquest};
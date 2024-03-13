var braintree = require("braintree");
const donation=require('../models/donationsModel');
const Campaign = require('../models/campaignModel');

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "shq9mzng2k4xykmj",
  publicKey: "yj4fdxxws9yw4gdv",
  privateKey: "91b6df0d5ae42e8649bf214edf7a9491",
});
//token
const paymentToken=async (req,res)=>{
    try{
        gateway.clientToken.generate({},(err,response) => {
            // console.log( "Token resp is : " , response);
            if(err){
                res.status(500).send(err);
            }
            else{
                res.send(response);
            }

        })

    }
    catch(error){
        console.log(error);
    }
}
//payment
const payment=async(req,res)=>{
    try{
        const{amount,campaign,nonce}=req.body;
        console.log( "Campaign is : " , campaign);
        // console.log("nonce " , nonce);
        let newTransaction= await gateway.transaction.sale({
            amount:amount,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        async function(error,result){
            // console.log(result);
            if(result){
                const newDonation= await new donation({
                    campaign:campaign,
                    payment:result,
                    donater:req.user_id
                }).save();

                // const updatedAmount = parseFloat(campaign.amountCollected) + parseFloat(amount);

                const currCampaign = await Campaign.findById(campaign._id);
                // console.log("The response is : " , currCampaign);

                const response = await Campaign.findByIdAndUpdate(campaign._id , 
                {
                    amountCollected : currCampaign.amountCollected + parseFloat(amount)
                },
                {new:true});
                // console.log("The New Saved Campaign is : " , response);
                res.json({ok:true});
            }
            else{
                res.status(500).send(error);
                console.log(error)
            }
         })

         console.log(newTransaction);
}
    catch(error){
        console.log(error);
    }
}

module.exports=({paymentToken,payment})
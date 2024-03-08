var braintree = require("braintree");
const donation=require('../models/donationsModel')

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "shq9mzng2k4xykmj",
  publicKey: "yj4fdxxws9yw4gdv",
  privateKey: "91b6df0d5ae42e8649bf214edf7a9491",
});
//token
const paymentToken=async (req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
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
        let newTransaction=gateway.transaction.sale({
            amount:amount,
            paymentMethodNonce:nonce,
            options:{
                submitForsettlement:true
            }

        },
        function(error,result){
            if(result){
                const newDonation=new donation({
                    campaign:campaign,
                    payment:result,
                    donater:req.user_id


                }).save()
            
        
       
        
        res.json({ok:true});
    }
        else{
            res.status(500).send(error);
        }



    })
}
    catch(error){
        console.log(error);
    }
}

module.exports=({paymentToken,payment})
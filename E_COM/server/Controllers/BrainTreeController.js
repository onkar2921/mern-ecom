
const user=require("../Models/UserModel")
const braintree=require("braintree")
require("dotenv").config()



const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHENT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const getToken=async(req,res)=>{
    try {

        gateway.clientToken.generate({}, function (err, response) {
            res.send(response.clientToken);
          });
        
    } catch (error) {
        console.log(error.message)
    }
}


const processPaymentController=async(req,res)=>{
  try {

    let nonceFromClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount

    const newTransaction=gateway.transaction.sale({
      amount:amountFromTheClient,
      paymentMethodNonce:nonceFromClient,
      options:{
        submitForSettlement:true
      }
    })


    if(newTransaction){
      return res.status(200).json({message:"payment sucessfully",newTransaction})
    }

    return res.status(400).json({message:"failed in payment process"})


    
  } catch (error) {
    console.log(error.message)
  }
}


module.exports={getToken,processPaymentController}
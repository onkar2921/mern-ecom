const express=require("express")
const route=express.Router()

const {UserMiddleware}=require("../Middlewares/UserMiddleware")
const {getToken,processPaymentController}=require("../Controllers/BrainTreeController")



route.get("/braintree/getToken/:UserId",UserMiddleware,getToken)
route.post("/braintree/payments/:UserId",UserMiddleware,processPaymentController)

module.exports=route




// try {
//     const { nonce } = await instance.requestPaymentMethod();
//     const response = await axios.post(`http://localhost:8000/braintree/payments/${UserId}`, {
//       amount: sum,
//       paymentMethodNonce: nonce,
//     }, {
//       headers: { authorization: `Bearer ${token}` },
//     });

//     if (response.status === 200) {
//       console.log('Response of order', response.data);
//       alert(response.data.message);
//     } else {
//       alert(response.statusText);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
const express=require("express")
const route=express.Router()
const {UserMiddleware}=require("../Middlewares/UserMiddleware")
const {AdminMiddleware}=require("../Middlewares/AdminMiddleware")


const {RegisterController,LoginController,UserProfileController,UpdateUserProfileController}=require("../Controllers/UserController")

route.post("/Register",RegisterController)
route.post("/Login",LoginController)
route.get("/checkUser/:UserId",UserMiddleware,(req,res)=>{
    res.send("valid bro")
})


route.get("/checkAdmin/:AdminId",AdminMiddleware,(req,res)=>{
    res.send("valid admin bro")
})


route.get("/userProfile/:UserId",UserMiddleware,UserProfileController)
route.patch("/updateUserProfile/:UserId",UserMiddleware,UpdateUserProfileController)
module.exports=route
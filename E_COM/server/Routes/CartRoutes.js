const express=require("express")
const route=express.Router()

const {UserMiddleware}=require("../Middlewares/UserMiddleware")

const {getUserCartController,addToCartController,decrementProductCountController}=require("../Controllers/CartController")


route.get("/getUserCart/:UserId",UserMiddleware,getUserCartController)
route.post("/addToCart/:UserId",UserMiddleware,addToCartController)
route.patch("/decrementProductCount/:UserId",UserMiddleware,decrementProductCountController)
module.exports=route
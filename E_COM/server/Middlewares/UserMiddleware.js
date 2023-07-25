const user=require("../Models/UserModel")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const UserMiddleware=async(req,res,next)=>{
    try {

        const {UserId}=req.params
        let token=req.headers.authorization

        const exist=await user.findById(UserId)
        if(exist && token.startsWith("Bearer ")){
            token=token.split(" ")[1]

            const verifytoken=jwt.verify(token,process.env.SECREATE)

            if(verifytoken){
                req.user=verifytoken._id
              return  next()
            }

            return res.status(400).json({message:"Unauthorized user"})
        }        
    } catch (error) {
        console.log(error.message)
    }
}



module.exports={UserMiddleware}
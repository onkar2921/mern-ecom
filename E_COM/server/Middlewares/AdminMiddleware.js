const user=require("../Models/UserModel")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const AdminMiddleware=async(req,res,next)=>{
    try {

        const {AdminId}=req.params
        let token=req.headers.authorization

        const exist=await user.findById(AdminId)
        if(exist && token.startsWith("Bearer ") ){
            token=token.split(" ")[1]

            const verifytoken=jwt.verify(token,process.env.SECREATE)
            
            if(verifytoken && exist.role===1){
                
                req.user=verifytoken._id
               return next()
            }else{

                return res.status(400).json({message:"Unauthorized Admin"})
            }

        } 
        return res.status(400).json({message:"token not available"})       
    } catch (error) {
        console.log(error.message)
    }
}



module.exports={AdminMiddleware}
const user=require("../Models/UserModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const RegisterController=async(req,res)=>{

    try {

        const {name,email,password}=req.body

        const hashPwd=bcrypt.hashSync(password,12)

        const NewUser=await user.create({name,email,password:hashPwd})

        if(NewUser){
            return res.status(200).json({message:"user created sucessfully",NewUser})
        }
        return res.status(400).json({message:"failed in creation of user"})


    } catch (error) {
        console.log(error.message)
    }

}


const LoginController=async(req,res)=>{
    try {

        const {email,password}=req.body

        const ValidUser=await user.findOne({email})
        

        if(ValidUser){
            const ValidPwd=bcrypt.compareSync(password,ValidUser.password)
            if(ValidPwd){
                let token=jwt.sign({email,id:ValidUser._id},process.env.SECREATE)
                // res.cookie("cookies",token,{expire:new Date()+9999})
                return res.status(200).json({message:"Logiied in sucessfully",token,ValidUser})
            }
            return res.status(400).json({message:"invalid password"})

        }
        return res.status(400).json({message:"failed in login"})
        
    } catch (error) {
        console.log(error)
    }
}


const UserProfileController=async(req,res)=>{
    try {
        const {UserId}=req.params

        const User=await user.findById(UserId)

        if(User){
            return res.status(200).json({message:"getting user profile",User})
        }
        return res.status(400).json({message:"user profile not found"})
    } catch (error) {
        console.log(error.message)
    }
}

const UpdateUserProfileController=async(req,res)=>{
    try {

// console.log("req body",req.body)
        const {UserId}=req.params
        const {name,email,about}=req.body

        // let photo=null
        // if(req.file){
        //     photo=req.file.filename
        // }

        const updatedUser=await user.findByIdAndUpdate(UserId,{name,email,about:about},{new:true})
        if(updatedUser){
            return res.status(200).json({message:"user profile updated sucessfully",updatedUser})
        }
        return res.status(400).json({message:"failed in updation of user profile"})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports={RegisterController,LoginController,UserProfileController,UpdateUserProfileController}
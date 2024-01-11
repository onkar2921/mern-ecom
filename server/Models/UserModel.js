const mongoose=require("mongoose")

const {ObjectId}=mongoose.Schema
const UserSchema=new mongoose.Schema({

        name:{
            type:String,
            trim:true,
            required:true,
        },
        email:{
            type:String,
            trim:true,
            required:true,
            unique:true
        },
        password:{
            type:String,
            trim:true,
            required:true,
        },
        about:{
            type:String,
            trim:true,
        },
        role:{
            type:Number,
            default:0
        },
        history:[{
            type:ObjectId,
            ref:"order"
        }]


},{timestamps:true})


// user.methods(()=>{
    
// })

const user=mongoose.model("user",UserSchema)


module.exports=user
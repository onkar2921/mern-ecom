const mongoose=require("mongoose")

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

const category= mongoose.model("category",CategorySchema)

module.exports=category
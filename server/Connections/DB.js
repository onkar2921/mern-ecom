const mongoose=require("mongoose")
require("dotenv").config()

const ConnnectDB=async()=>{

        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("connected to database")
        })
}

module.exports=ConnnectDB
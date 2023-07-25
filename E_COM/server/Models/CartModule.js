const mongoose=require("mongoose")

const { ObjectId } = mongoose.Schema;

const CartSchema=new mongoose.Schema({

        userCart:
            [{
                
                ProductId:{
                    type:ObjectId,
                    ref:"product"
                },
                count:{
                    type:Number,
                    default:0
                }
            }
            ]
        ,
        user:{
            type:ObjectId,
            ref:"user"
        }
        


},{timestamps:true})


const cart=mongoose.model("cart",CartSchema)


module.exports=cart





const order=require("../Models/OrderModel")
const cart=require("../Models/CartModule")
const user=require("../Models/UserModel")
const product=require("../Models/ProductModel")

const createOrderController=async(req,res)=>{

    try {

        console.log(req.body.amount)
        // req.body.Products?.map(item=>console.log("item",item.ProductId))
        

        const {UserId}=req.params

        const Order= new order({
            products: req.body.Products,
            address:req.body.address,
            amount:req.body.amount,
            transactionId:req.body.transactionId,
            user:UserId

        })
            await Order.save()

            


            const Clearcart=await cart.deleteMany({user:UserId})


            //PUSH order in user history

            const UpdateUserHistory=await user.findByIdAndUpdate(UserId,{$push:{history:Order}},{new:true})


            //update product quantity and sold 

        let bulkOptions=req.body.Products.map((item)=>{
                return{
                    updateOne:{
                        filter:{_id:item.ProductId},
                        update:{$inc:{quantity:-item.count,sold:+item.count}}
                    }

                }
            })



            const updateProduct=await product.bulkWrite(bulkOptions)


            if(Order && Clearcart && updateProduct && UpdateUserHistory){
                
                return res.status(200).json({message:"order sucessful",Order,UpdateUserHistory,updateProduct })
            }else{
                
                return res.status(400).json({message:"order unsucessful"})
           

            }




        
    } catch (error) {
        console.log(error.message)
    }
}


const getAllOrdersController=async(req,res)=>{
    try {

        const AllOrders=await order.find({}).populate({path:"user", select: 'name _id'}).sort("-created")

        if(AllOrders){
            return res.status(200).json({message:"getting all orders",AllOrders})
        }else{
            return res.status(400).json({message:"failed in gerting all orders"})
        }
        
    } catch (error) {
        
        console.log(error.message)
    }
}




const getStatusController=async(req,res)=>{
    try {

        res.json(order.schema.path("status").enumValues)
        
    } catch (error) {
        console.log(error.message)
    }
}


const updateStatus=async(req,res)=>{
    try {

        const {OrderId,status}=req.body

        const updateOrderStatus=await order.findByIdAndUpdate(OrderId,{$set:{status}},{new:true})
            if(updateOrderStatus){
                return res.status(200).json({message:"order status updated",updateOrderStatus})
            }

            return res.status(400).json({message:"failed in updation of order status"})
        
    } catch (error) {
        console.log(error.message)
    }
}


const getUserHistoryController=async(req,res)=>{
    try {

        const {UserId}=req.params

        const User=(await user.find({_id:UserId}))
        
        let products=User[0].history
        
        console.log(User[0])
    //    products.map((item)=>{
    //    })
        

        if(User){
            return res.status(200).json({message:"getting user history",User})
        }

        return res.status(400).json({message:"failed in getting user history"})

        
    } catch (error) {
        console.log(error.message)
    }
}


module.exports={createOrderController,getAllOrdersController,updateStatus,getStatusController,getUserHistoryController}
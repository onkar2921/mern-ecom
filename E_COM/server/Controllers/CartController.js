const cart = require("../Models/CartModule");
const user = require("../Models/UserModel");

const getUserCartController = async (req, res) => {
  try {
    const { UserId } = req.params;

    const ValidUser = await cart.findOne({ user: UserId }).populate("user").populate("userCart.ProductId");

    console.log("Valid user", ValidUser);
    if (ValidUser) {
      return res
        .status(200)
        .json({ message: "getting user cart", UserCart: ValidUser });
    }
    return res.status(400).json({ message: "user cart not found" });
  } catch (error) {
    console.log(error.message);
  }
};


const addToCartController = async (req, res) => {
    try {
      const { UserId } = req.params;
      const { ProductId,count } = req.body;
  
      // console.log("products", ProductId);
  
      const array = { ProductId, count: count };
  
      const validCart = await cart.findOne({ user: UserId }).populate("user");
  
      // console.log("validCart", validCart);
  
      if (!validCart) {
        const newCart = await cart.create({
          user: UserId,
          userCart: [array],
        });
  
        return res.status(200).json({ message: "Cart is initiating", Cart:newCart });
      }
  
      const found = validCart.userCart.some(
        (item) => item.ProductId.toString() === ProductId.toString()
      );
  
      // console.log("found", found);
  
      if (!found) {
        validCart.userCart.push({ ProductId, count});
  
        await validCart.save();
  
        
  
        return res.status(200).json({ message: "Added to cart", Cart:validCart });
      }

      if(found){

        
        const index = validCart.userCart.findIndex(item => item.ProductId.toString() === ProductId.toString());
        
        if (index !== -1) {
          // If the item exists in userCart, increment the count
          validCart.userCart[index].count +=Number(count);
        } 
      }

      
      // const getCart = await cart
      // .findById(validCart._id)
      // .populate("userCart.ProductId");
      return res.status(200).json({ message: "Item already exists in cart",Cart:validCart });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };






  // const decrementProductCountController=async(req,res)=>{
  //   try {

  //     const {UserId}=req.params

  //     const {ProductId}=req.body

  //     const Cart=await cart.findOne({user:UserId})

  //     const indexOfProduct=Cart.userCart.findIndex((item)=>item.ProductId.toString()===ProductId.toString())

  //     if(indexOfProduct!==-1){
  //       if(Cart.userCart[indexOfProduct].count !== 1){

  //         Cart.userCart[indexOfProduct].count -= 1
  //         return res.status(200).json({message:"product is rcount decrement",Cart})
  //       }

  //     const newUpdatedCart=  Cart.userCart.filter((item)=>item.ProductId.toString()!==ProductId.toString)
  //          await  newUpdatedCart.save()
  //          return res.status(200).json({message:"product is removed because of count ==0",newUpdatedCart})
  //     }

  //     return res.status(200).json({message:"product not exist",Cart})
  
      
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }



  const decrementProductCountController = async (req, res) => {
    try {
      const { UserId } = req.params;
      const { ProductId } = req.body;
  
      const Cart = await cart.findOne({ user: UserId });
  
      const indexOfProduct = Cart.userCart.findIndex(
        (item) => item.ProductId.toString() === ProductId.toString()
      );
  
      if (indexOfProduct !== -1) {
        if (Cart.userCart[indexOfProduct].count !== 1) {
          Cart.userCart[indexOfProduct].count -= 1;
          await Cart.save();
          return res.status(200).json({
            message: "Product count decremented",
            Cart 
          });
        } else {
          Cart.userCart.splice(indexOfProduct, 1);
          await Cart.save();
          return res.status(200).json({
            message: "Product removed because count == 0",
            Cart
          });
        }
      }
  
      return res.status(200).json({ message: "Product does not exist", Cart });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  


    
module.exports = { getUserCartController, addToCartController,decrementProductCountController };

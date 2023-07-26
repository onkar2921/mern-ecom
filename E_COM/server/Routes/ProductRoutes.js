const express = require("express");
const route = express.Router();
const { AdminMiddleware } = require("../Middlewares/AdminMiddleware");

const {
  createProductController,
  getsingleProductController,
  getAllProductsController,
  deleteProductController,
  updateProductController,
  productListController,
  getRelatedProductsController,
  getCategoriesOfProductController,
  SearchProductsController,
} = require("../Controllers/ProductController");



// route.post("/temp",(req,res)=>{
  //   res.send("fsvofdbv")
  // })
  
  
  
  route.get("/getAllProducts", getAllProductsController);
  route.get("/getSingleProduct/:ProductId", getsingleProductController);
  route.patch(
    "/updateProduct/:AdminId/:ProductId",
    AdminMiddleware,
    updateProductController
    );
    


    route.delete(
      "/deleteProduct/:AdminId/:ProductId",
  AdminMiddleware,
  deleteProductController
);




route.get("/getProductsList", productListController);
route.get("/getRelatedProducts/:ProductId", getRelatedProductsController);
route.get("/getCategoryOfProducts", getCategoriesOfProductController);
route.post("/ProductsBySearch", SearchProductsController);

module.exports = route;
